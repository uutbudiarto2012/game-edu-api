const express = require('express');
const tokenVerify = require('../../config/tokenVerify');
const router  = express.Router();
const categoryController = require('../../controllers/category/game')
const {body}    = require('express-validator');

// CREATE CATEGORY
router.post("/",tokenVerify,[
    body('category').isLength({min:10,max:200}).withMessage("minimal 10 and maximal 200 chars long!"),
],categoryController.create)

// UDPATE CATEGORY
router.put("/:id",tokenVerify,[
    body('category').isLength({min:10,max:200}).withMessage("minimal 10 and maximal 200 chars long!"),
],categoryController.update)

// DELETE
router.delete("/:id",tokenVerify,categoryController.delete)

// GET CATEGORY
router.get("/",categoryController.getAll)



module.exports = router;