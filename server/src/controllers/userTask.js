import express from "express";
import prisma from "../prisma/client.js";

export const taskController = async (req, res) => {
  const  list = req.body;
 
  try {
    const newTaskList = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        tasks: list,
      },
    });
    
    
    res.status(201).json({message:"Task list created successfully", newTaskList });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error creating task list" });
  }
};
