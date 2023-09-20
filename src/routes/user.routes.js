import express from "express";
import {FindAllUser} from "../controllers/user.controllers.js";
import {Authorization} from '../middleware/authorization.js'
import { Validation } from "../controllers/validation.controllers.js";
import {} from "../validations/user.validation.js";

const router = express.Router();

router.get("/users",Authorization(["admin"],["finduser"]), FindAllUser);

export default router;
