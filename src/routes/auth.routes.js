import express from "express";
import {
  Register,
  Login,
  RefreshToken,
} from "../controllers/auth.controllers.js";
import { Validation } from "../controllers/validation.controllers.js";
import {
  userData,
  userLogin,
  refreshToken,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/register", userData, Validation, Register);
router.post("/login", userLogin, Validation, Login);
router.post("/refresh-token", refreshToken, Validation, RefreshToken);

export default router;
