import { Request, Response } from "express";
import User from "../models/User.js";
import { Schema } from "mongoose";
import generateJWT from "../utils/generateJWT.js";
import generateId from "../utils/generateId.js";

const register = async (req: Request, res: Response) => {
  try {
    const { email } = new User(req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("Usuario ya registrado");
      return res.status(401).json({ msg: error.message });
    }

    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      return res.status(403).json({ msg: error.message });
    }

    // Comprobar si el ususario está confirmado
    if (!user.confirmed) {
      const error = new Error("Account not confirmed");
      return res.status(403).json({ msg: error.message });
    }

    if (await user.validatePassword(password)) {
      res.status(200).json({
        _id: user._id,
        nombre: user.name,
        lastName: user.lastName,
        email: user.email,
        token: generateJWT(user.id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      return res.status(403).json({ msg: error.message });
    }
    user.token = "";
    await user.save();
    return res.status(200).json({ msg: "User logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }

  res.send("logout");
};

const confirmAccount = async (req: Request, res: Response) => {
  const { token } = req.params; // desde la url es por req.params

  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error("Not a valid token");
    return res.status(401).json({ msg: error.message });
  }

  try {
    user.token = null;
    user.confirmed = true;
    await user.save();
    res.status(200).json({ msg: "Account confirmed" });
  } catch (error) {
    console.log(error.message);
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      return res.status(401).json({ msg: error.message });
    }
    user.token = generateId();
    await user.save();

    // enviar email

    res.status(200).json({ msg: "Email sent" });
  } catch (error) {}
};

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.token = null;
    user.password = password;
    await user.save();
    res.status(200).json({ msg: "Password reseted" });
  } catch (error) {
    console.error(error.message);
  }
};

const validateToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      const error = new Error("There was an error");
      return res.status(400).json({ msg: error.message });
    }
    res.status(200).json({ msg: "Token validated" });
  } catch (error) {
    console.log(error)
  }
};
export { register, login, logout, confirmAccount, forgotPassword, resetPassword, validateToken };
