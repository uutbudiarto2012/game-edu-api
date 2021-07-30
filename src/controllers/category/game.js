const {knex} = require('../../config/db')
const urlSlug   = require('../../utils/slugify')
const { validationResult } = require("express-validator");

exports.create = async (req,res)=>{
    const errors = validationResult(req)
    const role = req.user.role;
    try {
        if(role !== 1) return res.status(403).json({message:"You have no authority!"})     
        const category = req.body.category;
        const slug = urlSlug(req.body.category);
        const data = {category,slug};
        if(!errors.isEmpty()) res.status(400).json({message:"Invalid input!",error:errors.array()[0]})
        const result = await knex('game_category').insert(data);
        if(result){
            res.status(201).json({message:"Category created!",data:data})
        }        
    } catch (err) {
        res.status(500).json({message:"Internal server error!",error:err})
    }
}
exports.update = async (req,res)=>{
    const errors = validationResult(req)
    const role = req.user.role;
    const id   = req.params.id;
    try {
        if(role !== 1) return res.status(403).json({message:"You have no authority!"})  
        if(!errors.isEmpty()) res.status(400).json({message:"Invalid input!",error:errors.array()[0]})

        const category = req.body.category;
        const slug = urlSlug(req.body.category);
        const data = {category,slug};
        const result = await knex('game_category').where('id',id).update(data);
        if(result){
            res.status(200).json({message:"Category updated!",data:data})
        }else{
            res.status(400).json({message:"failed update category!"})
        }     
    } catch (err) {
        res.status(500).json({message:"Internal server error!",error:err})
    }
}
exports.delete = async (req,res)=>{
    const errors = validationResult(req)
    const role = req.user.role;
    const id   = req.params.id;
    try {
        if(role !== 1) return res.status(403).json({message:"You have no authority!"})  
        if(!errors.isEmpty()) res.status(400).json({message:"Invalid input!",error:errors.array()[0]})

        const result = await knex('game_category').where('id',id).del();
        if(result){
            res.status(200).json({message:"Category deleted!"})
        }else{
            res.status(400).json({message:"failed delete category!"})
        }     
    } catch (err) {
        res.status(500).json({message:"Internal server error!",error:err})
    }
}
exports.getAll = async (req,res)=>{
    try {
        const result = await knex('game_category');
        if(result){
            res.status(200).json({message:"Get category success!",data:result})
        }else{
            res.status(404).json({message:"Category not found!"})
        }     
    } catch (err) {
        res.status(500).json({message:"Internal server error!",error:err})
    }
}