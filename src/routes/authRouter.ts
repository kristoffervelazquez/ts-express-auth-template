import { Router } from "express";
import {
  confirmAccount,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  validateToken,
} from "../controllers/authController.js";
import validateRequest from "../middlewares/requestValidation.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../controllers/validators/authValidator.js";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), register);
authRouter.post("/login", validateRequest(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.post("/confirm/:token", confirmAccount);
authRouter
  .route("/resetPassword/:token")
  .post(validateRequest(resetPasswordSchema), resetPassword)
  .get(validateToken);
authRouter.post("/forgotPassword", forgotPassword);

export default authRouter;
