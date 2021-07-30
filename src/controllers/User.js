const { knex } = require("../config/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await knex("users").where("user_id", userId);
    !profile[0] &&
      res.status(404).json({
        message: "user not found!",
        data: {},
      });
    parseInt(userId) !== req.user.id &&
      res.status(404).json({
        message: "user not found!",
        data: {},
      });
    const { user_id, password, ...info } = profile[0];
    res.status(200).json({
      message: "Get profile success!",
      data: info,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
      error: err,
    });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.params.id;
  parseInt(userId) !== req.user.id &&
    res.status(404).json({
      message: "you can only update your profile!",
      data: {},
    });
  const updatedAt = {
    updated_at: new Date(),
  };
  const { password, username, email, user_id, ...dataUpdate } = req.body;
  const isUpdate = await knex("users")
    .where("user_id", userId)
    .update(dataUpdate)
    .update(updatedAt);
  if (isUpdate) {
    const { password, ...infoUpdate } = dataUpdate;
    res.status(200).json({
      message: "Update data success!",
      data: infoUpdate,
    });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.params.id;
  const currentPassword = req.body.current_password;
  const newPassword = req.body.new_password;

  parseInt(userId) !== req.user.id &&
    res.status(404).json({
      message: "you can only update your password!",
      data: {},
    });

  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ message: "Bad request!", error: errors.array()[0] });
  if(newPassword === currentPassword) return res.status(403).json({ message: "Password can not same!" })

  try {
    const user = await knex("users").where("user_id", userId);
    if (user[0]) {
      //VALIDASI PASSWORD
      const validPassword = await bcrypt.compare(currentPassword,user[0].password)
      if(!validPassword) return res.status(404).json({ message: "Wrong current password!" });
      // GENARATE NEW PASSWORD
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(newPassword,salt)
      const newTime = new Date();
      const result = await knex('users').where('user_id',user[0].user_id).update('password',hashedPass).update({updated_at: newTime})
      result && res.status(200).json({message:"password has been updated!"})
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
      error: err,
    });
  }
};

exports.deleteAccount = async (req,res)=>{
  if(parseInt(req.params.id) === req.user.id){
    const result = await knex('users').where('user_id',req.params.id).del()
    if(result) return res.status(200).json({message:"account has been deleted!"})
  }else{
    res.status(403).json({
      message: "You can only delete your account!"
    });
  }
}
