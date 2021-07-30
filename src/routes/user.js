const express = require('express')
const router    = express.Router();
const userController = require('../controllers/User')
const tokenVerify = require('../config/tokenVerify')
const {body}    = require('express-validator');

// GET PROFILE
router.get("/:id",tokenVerify,userController.getProfile)
// UPDATE PROFILE
router.put('/:id',tokenVerify,userController.updateProfile)
// CANGE PASSWORD
router.post("/:id/password",tokenVerify,[
    body('new_password').isLength({min:6}).withMessage("password must be at least 6 chars long!"),
],userController.changePassword)

// DELETE ACCOUNT
router.delete('/:id',tokenVerify,userController.deleteAccount)


module.exports = router;
