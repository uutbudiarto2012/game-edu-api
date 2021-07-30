const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

function tokenVerify(req,res,next) {
    const authHeader = req.headers.token;
    if(authHeader){
        const type = authHeader.split(" ")[0];
        const token = authHeader.split(" ")[1];
        if(type && type === process.env.TOKEN_TYPE){
            jwt.verify(token,process.env.KEY_TOKEN,(err,user)=>{
                if(err) res.status(403).json("Invalid token!")
                req.user = user;
                next();
            })
        }else{
            res.status(403).json("Invalid token!")
        }
    }else{
        res.status(401).json("You are not authenticated!")
    } 
}

module.exports = tokenVerify;