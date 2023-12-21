const express = require("express")
const { CreateTask, GetallTask, GetTaskByid, DeleteTaskById, UpdateTaskbyid } = require("../controllers/taskcontroller")
const router = express.Router()

router.route("/").post(CreateTask).get(GetallTask)
router.route("/:id").get(GetTaskByid).delete(DeleteTaskById).put(UpdateTaskbyid)

module.exports = router