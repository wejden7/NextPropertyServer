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


const router = express.Router();
export  const JwtRouterAuth = express.Router();

router.post("/register", userData, Validation, Register);
router.post("/login", userLogin, Validation, Login);
router.post("/refresh-token", token, Validation, RefreshToken);
router.post("/forgot-password", email, Validation, ForgotPassword);
router.post("/reset-password", resetPassword, Validation, ResetPassword);

JwtRouterAuth.get("/send-email-verify", SendEmailVerify);
JwtRouterAuth.post("/email-verify",token,Validation, EmailVerify);


export default router;
