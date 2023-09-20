import { body } from "express-validator";
import { FindById } from "../crud/role.crud.js";
import { FindByEmail, FindByIdNumber } from "../crud/user.crud.js";

export const userLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await FindByEmail(email);

      if (user) {
        req.user = user;

        return true;
      }
      throw new Error("Email Not Found");
    }),

  body("password")
    .notEmpty()
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ min: 6 })
    .withMessage(
      "Password is too weak. It should be at least 6 characters long."
    ),
];

export const resetPassword = [
  body("token").notEmpty().withMessage("token is required"),

  body("password")
    .notEmpty()
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ min: 6 })
    .withMessage(
      "Password is too weak. It should be at least 6 characters long."
    ),
];

export const userData = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await FindByEmail(email);

      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ min: 6 })
    .withMessage(
      "Password is too weak. It should be at least 6 characters long."
    ),

  body("telephone_number").custom((value) => {
    if (value === "" || !isNaN(value)) {
      return true;
    }
    throw new Error("telephone number must be a number");
  }),

  body("id_number")
    .notEmpty()
    .withMessage("Id Number is required")
    .custom(async (id_number) => {
      const user = await FindByIdNumber(id_number);
      if (user) {
        throw new Error("id number already exists");
      }
      return true;
    }),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .custom(async (value) => {
      const role = await FindById(value);
      if (!role) {
        throw new Error("role not found ");
      }
      return true;
    }),
];

export const token = [
  body("token").notEmpty().withMessage("Token is required"),
];

export const email = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await FindByEmail(email);
      if (user) {
        req.user = user;
        return true;
      }
      throw new Error("Email Not Found");
    }),
];

export const newPassword =[
 
  body("oldpassword")
    .notEmpty()
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ min: 6 })
    .withMessage(
      "Password is too weak. It should be at least 6 characters long."
    ),
    body("newpassword")
    .notEmpty()
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ min: 6 })
    .withMessage(
      "Password is too weak. It should be at least 6 characters long."
    ),
];

export const userUpdate = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("telephone_number").custom((value) => {
    if (value === "" || !isNaN(value)) {
      return true;
    }
    throw new Error("telephone number must be a number");
  }),

  body("id_number")
    .notEmpty()
    .withMessage("Id Number is required")

 
];