import express from "express";
import {
  FindAllUser,
  FindAllAgent,
  ToggleBlockedUser,
  UpdateProfile,
  UpdatePassWord,
} from "../controllers/user.controllers.js";
import { Authorization } from "../middleware/authorization.js";
import { Validation } from "../controllers/validation.controllers.js";
import { newPassword, userUpdate } from "../validations/user.validation.js";

const router = express.Router();
export const JwtRouterUser = express.Router();

router.get("/agent", FindAllAgent);

JwtRouterUser.get("/users", Authorization(["admin"], []), FindAllUser);
JwtRouterUser.put(
  "/toggle-blocked-user/:id",
  Authorization(["admin"], []),
  ToggleBlockedUser
);

JwtRouterUser.put("/profile", userUpdate, Validation, UpdateProfile);
JwtRouterUser.put("/update-password", newPassword, Validation, UpdatePassWord);

export default router;
