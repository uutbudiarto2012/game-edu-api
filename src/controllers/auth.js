const { knex } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  try {
    // GENERATE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPass,
      display_name: req.body.display_name,
      phone_number: req.body.phone_number,
      country: req.body.country,
      city: req.body.city,
    };

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Bad request!",
        error: errors.array(),
      });
    } else {
      const result = await knex("users").insert(user);
      if (result) {
        const { password, ...info } = user;
        res.status(201).json({
          message: "Register success!",
          data: info,
        });
      } else {
        res.status(403).json({
          message: "Register failed!",
          data: {},
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await knex("users")
    .where("username", username)
    .orWhere("email", username);
  if (user[0]) {
    // CEK PASSWORD
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (validPassword) {
      // GENERATE TOKEN
      const accessToken = jwt.sign(
        {
          id: user[0].user_id,
          email: user[0].email,
          role : user[0].role
        },
        process.env.KEY_TOKEN,
        { expiresIn: "5d" }
      );
      const { password, ...infoUser } = user[0];
      res.status(200).json({
        message: "Login success!",
        data: infoUser,
        accessToken: {
          token: accessToken,
          type: "Bearer",
        },
      });
    } else {
      res.status(403).json({
        message: "Wrong password or username!",
      });
    }
  } else {
    res.status(404).json({
      message: "User not found!",
    });
  }
};
