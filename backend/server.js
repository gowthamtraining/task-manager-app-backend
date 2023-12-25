const express = require("express")
const app = express()
const env = require("dotenv").config()
const mongodb = require("mongoose")
const cors = require("cors")

const TaskRouter  = require("./routes/taskroutes")

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3001","https://mern-task-manager-app-0p03.onrender.com/"]
}))
app.use("/api/task",TaskRouter)
app.use(express.urlencoded({extended:false}))

mongodb.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running successfully ${PORT}`)
    })
}).catch((err)=>console.log(err))




