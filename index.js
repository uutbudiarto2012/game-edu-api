const express = require('express')
const dotenv  = require('dotenv')
const app = express()

const authRouter = require('./src/routes/auth')
const userRouter = require('./src/routes/user')
const gameCategoryRouter = require('./src/routes/category/game')

dotenv.config()
const port = process.env.PORT;

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/game/category',gameCategoryRouter)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
  });


app.listen(port,(req,res)=>{
    console.log(`Server running on PORT ${port}`)
})