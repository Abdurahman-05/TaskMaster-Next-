import express from "express";
import { taskController } from "../controllers/userTask.js";
import { updateController } from "../controllers/updateUser.js";



const userTask = express.Router();

userTask.post('/user',taskController)
userTask.put('/update',updateController)

export default userTask;
