import express from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  const { username, email, password, rePassword, phone, dateOfBirth } =
    req.body;
  console.log(req.body);

  if (password !== rePassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  const duplicateUser = await prisma.user.findUnique({ where: { email } });
  if (duplicateUser) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        dateOfBirth,
      },
    });

    return res.status(350).json({
      message: "user successfully registered!!!",
      user: username,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }
};
