import express from "express";
import {
  Register,
  Login,
  RefreshToken,
  ForgotPassword,
  ResetPassword
} from "../controllers/auth.controllers.js";
import { Validation } from "../controllers/validation.controllers.js";
import {
  userData,
  userLogin,
  refreshToken,
  email,
  resetPassword
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/register", userData, Validation, Register);
router.post("/login", userLogin, Validation, Login);
router.post("/refresh-token", refreshToken, Validation, RefreshToken);
router.post("/forgot-password", email, Validation, ForgotPassword);
router.post("/reset-password", resetPassword, Validation, ResetPassword);

export default router;
