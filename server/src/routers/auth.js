import express from "express";
import { registerController } from "../controllers/register.js";

const auth = express.Router();

auth.post("/signup", registerController);

export default auth;
