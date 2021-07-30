const {knex} = require('./db')

async function authVerify (req,res,next){
    const {email,username} = req.body;
    const user = await knex('users').where('email',email).orWhere('username',username);
    if(!user[0]){
        next()
    }else{
        res.status(403).json({
            message : "Username or email is registered!"
        })

    }
}

module.exports = authVerify;