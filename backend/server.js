const express = require("express")
const app = express()
const env = require("dotenv").config()
const mongodb = require("mongoose")
const cors = require("cors")

const TaskRouter  = require("./routes/taskroutes")

const PORT = process.env.PORT || 5000
app.use(cors({
    origin: ["https://mern-task-manager-app-0p03.onrender.com", "http://localhost:3000"],
    optionsSuccessStatus: 200,
}));

app.use(express.json())
app.use("/api/task",TaskRouter)
app.use(express.urlencoded({extended:false}))

mongodb.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running successfully on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application on MongoDB connection error
});





