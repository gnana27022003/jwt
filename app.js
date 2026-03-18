const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose')



mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB Connected'))
.catch((err)=>console.log('MongoDB connection error:',err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const router = require('./routes/router')
const {errorMiddleware} = require('./middlewares/errorMiddleware')

app.use(router)

app.use(errorMiddleware)





app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on http://localhost:${process.env.PORT}`)
})

