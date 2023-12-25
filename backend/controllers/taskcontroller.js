const Task = require("../model/servermodel")


const CreateTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        if (!task) {
            return res.status(500).json({ msg: "Failed to create task" });
        }
        else{
        res.status(200).json(task)
        };
    } catch (error) {
        if (error.name === 'ValidationError' && error.errors && error.errors.name) {
            // Handle validation error for 'name' field
            return res.status(400).json({ msg: 'Please provide a valid name' });
        }

        res.status(500).json({ msg: error.message });
    }
};


const GetallTask = async (req,res)=>{
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
const GetTaskByid = async(req,res)=>{
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json(`There is no data for this ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const DeleteTaskById = async(req,res)=>{
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        

        if (!task) {
            return res.status(404).json(`There is no data for this ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const UpdateTaskbyid = async(req,res)=>{
    try {
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        })
        if (!task) {
            return res.status(404).json(`There is no data for this ${id}`);
        }
        res.status(200).json(task)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ errors: validationErrors });
        }
        res.status(500).json({ msg: error.message });

    }
}

module.exports = {
    CreateTask,
    GetallTask,
    GetTaskByid,
    DeleteTaskById,
    UpdateTaskbyid
}