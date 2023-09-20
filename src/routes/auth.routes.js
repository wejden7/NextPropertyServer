import express from "express";
import {
  Register,
  Login,
  RefreshToken,
  ForgotPassword,
  ResetPassword,
  SendEmailVerify,
  EmailVerify
} from "../controllers/auth.controllers.js";
import { Validation } from "../controllers/validation.controllers.js";
import {
  userData,
  userLogin,
  token,
  email,
  resetPassword
} from "../validations/user.validation.js";

import { JwtMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", userData, Validation, Register);
router.post("/login", userLogin, Validation, Login);
router.post("/refresh-token", token, Validation, RefreshToken);
router.post("/forgot-password", email, Validation, ForgotPassword);
router.post("/reset-password", resetPassword, Validation, ResetPassword);

router.use(JwtMiddleware)
router.get("/send-email-verify", SendEmailVerify);
router.post("/email-verify",token,Validation, EmailVerify);

export default router;
