import express from "express";
import { taskController } from "../controllers/userTask.js";



const userTask = express.Router();

userTask.post('/user',taskController)

export default userTask;
