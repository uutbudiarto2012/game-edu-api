const express = require('express')
const dotenv  = require('dotenv')
const app = express()

dotenv.config()

const port = process.env.PORT; 

app.listen(port,(req,res)=>{
    console.log(`Server running on PORT ${port}`)
})