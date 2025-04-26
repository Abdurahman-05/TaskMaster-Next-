import express from "express";
import { taskController } from "../controllers/userTask.js";
import userController from "../controllers/updateUser.js";



const userTask = express.Router();

userTask.put('/user',taskController)
userTask.put('/update',userController.updateController)
userTask.get('/task',userController.taskController)


export default userTask;
