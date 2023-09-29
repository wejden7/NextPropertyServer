import * as User from "../crud/user.crud.js";
import * as Service from "../service/index.js";
import sendMail from "../service/sendMail.js";
import fs from "fs";

export const Register = async (req, res, next) => {
  try {
    const data = req.body;
    await User.create(data);
    res.status(200).json("Create a Successful");
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.user;

    if (!Service.compareEncrypt(password, user.password))
      return res.status(404).json("Not Found p");

    const token = Service.createToken({ email: user.email, name: user.name });
    const refreshToken = Service.createRefreshToken(user.email);

    return res.status(200).json({
      message: "Login Success",
      token,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const RefreshToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  try {
    const decoded = Service.verifyRefreshToken(refreshToken);

    const user = await User.FindByEmail(decoded.email);
    if (!user) {
      next({ message: "Invalid refresh token 2", error });
    }
    const accessToken = Service.createToken({
      email: user.email,
      name: user.name,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next({ message: "Invalid refresh token ", error });
  }
};

export const ForgotPassword = async (req, res, next) => {
  try {
    const user = req.user;

    const resetToken = Service.createResetPasswordToken(user.email);

    const template = fs.readFileSync(
      "template/email_template_reset_your_password.html",
      "utf8"
    );

    const emailContent = template
      .replace("{{code}}", resetToken)
      .replace("{{name}}", user.name);

    await sendMail(user.email, emailContent);
    return res.status(200).json({ message: "ResetToken send successfully" });
  } catch (error) {
    next({ message: "Invalid Forgot Password ", error });
  }
};

export const ResetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  try {
    const decode = Service.verifyResetPasswordToken(token);

    await User.updatePassWord({ email: decode.email, password });
    return res.status(200).json({ message: "Reset Password  successfully" });
  } catch (error) {
    next({ message: "Invalid Reset Password", error });
  }
};

export const SendEmailVerify = async (req, res, next) => {
  try {
    const user = req.user;
    const token = Service.createEmailVerifyToken(user.email);

    const template = fs.readFileSync(
      "template/email_template_reset_your_password.html",
      "utf8"
    );

    const emailContent = template
      .replace("{{code}}", token)
      .replace("{{name}}", user.name);

    await sendMail(user.email, emailContent);
    return res.status(200).json({ message: "ResetToken send successfully" });
  } catch (error) {
    next({ message: "Invalid Verify Email", error: error });
  }
};

export const EmailVerify = async (req, res, next) => {
  const token = req.body.token;
  try {
    const decode = Service.verifyEmailVerifyToken(token);
    await User.verifyEmail(decode.email);

    res.status(200).json("Email verified");
  } catch (error) {
    next({ message: "Invalid Verify Email", error: error });
  }
};

export const IsAdmin = async (req, res, next) => {
  res.status(200).json("Admin");
};

export const CheckToken = async (req, res, next) => {
  res.status(200).json("Valide");
};
