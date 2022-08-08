const express = require ('express')
const cors= require ('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')

const app =express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedtopology:true
}).then(()=>{
    console.log("DB connected succuessfuly")
}).catch((error)=>{
    console.log(error.message)
})

app.use('/api/auth', userRouter)
// app.use('api/message', messageRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in Port: ${process.env.PORT}`)
})