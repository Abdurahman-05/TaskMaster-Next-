import express from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const updateController = async (req, res) => {
  let { username, email, password, phone, dateOfBirth } = req.body;
  console.log(req.user);

  const duplicateUser = await prisma.user.findUnique({ where: { email } });

  if (req.user.email !== email) {
    if (duplicateUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
  }
  if(!password){
    return res
        .status(400)
        .json({ error: "Password required" });
  }
  if(!email){
    return res
        .status(400)
        .json({ error: "email required" });
  }
  if(!username) username = email;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { email: req.user.email },
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        dateOfBirth,
      },
    });
    const accessToken = jwt.sign(
      {
        id: updatedUser.id,
        username: updatedUser.username,
        username: updatedUser.email,
      },
      process.env.ACCESS_TOKEN
    );

    return res
      .status(201)
      .json({ accessToken, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }
};