import { validationResult } from "express-validator";

export const Validation = (req, res, next) => {
  const errors = validationResult(req);

  // if there is error then return Error

  if (!errors.isEmpty()) {
    return res.status(400).json({
      messsage:"Data not valide",
      errors: errors.array(),
    });
  }
  next();
};