import Joi from "joi";
import { resetPassword } from "../authController.js";

const registerSchema = Joi.object({
  username: Joi.string().alphanum().lowercase().required().min(4),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required().min(8),
  name: Joi.string().required(),
});

// Define the Joi schema for updating user information
const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().lowercase(),
  lastName: Joi.string().alphanum(),
  email: Joi.string().email().lowercase(),
  password: Joi.string(),
  name: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase(),
  password: Joi.string(),
});

const logoutSchema = Joi.object({
  email: Joi.string().email().lowercase(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().required().min(8),
});

export { registerSchema, updateUserSchema, loginSchema, logoutSchema, resetPasswordSchema };
