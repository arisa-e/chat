const express = require ('express')
const cors= require ('cors')
const { default: mongoose } = require('mongoose')
const router = require('./routes/routes')

const app =express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', router)

mongoose.connect("mongodb://localhost:27017/chat", {
    useNewUrlParser: true,
    useUnifiedtopology:true
}).then(()=>{
    console.log("DB connected succuessfuly")
}).catch((error)=>{
    console.log(error.message)
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in Port: ${process.env.PORT}`)
})