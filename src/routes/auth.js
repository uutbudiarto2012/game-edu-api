const express   = require('express')
const router    = express.Router()
const {body}    = require('express-validator');
const authVerify = require('../config/authVerify');
const authController = require('../controllers/auth');


// REGISTER
router.post("/register",authVerify,[
    body('email').isEmail().withMessage("invalid email!"),
    body('username').isLength({min:6}).withMessage("username must be at least 5 chars long!"),
    body('password').isLength({min:6}).withMessage("password must be at least 5 chars long!"),
    body('display_name').trim(),
    body('phone').trim(),
    body('country').trim(),
    body('city').trim(),
],authController.register)
// LOGIN
router.post("/login",authController.login)

module.exports = router;

