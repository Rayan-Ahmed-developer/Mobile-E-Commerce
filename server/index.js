const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors= require('cors') 
const webRoutes = require('./Routes/appRoute')
const Router = require('./Routes/authRoute')


const app= express()
app.use(express.json())

app.use(cors())

app.use('/api/ecommerce',webRoutes)
app.use('/api/auth', Router)


mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("connected to database")
    app.listen(process.env.port,()=>{
        console.log(`server is running on port ${process.env.port}`)
    })
}).catch((err)=>{
    console.log("error connecting to database", err)
})