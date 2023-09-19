import * as User from "../crud/user.crud.js";
import * as ResetToken from "../crud/reset_token.crud.js";
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
  const refreshToken = req.body.refreshToken;
  try {
    const decoded = Service.verifyRefreshToken(refreshToken);

    const user = User.FindByEmail(decoded.email);
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
  const user = req.user;

  const resetToken = Math.random().toString(36).substring(2, 15);

  try {
    await ResetToken.create({ email: user.email, token: resetToken });
    const template = fs.readFileSync(
      "template/email_template_reset_your_password.html",
      "utf8"
    );
  
    const emailContent = template
      .replace("{{code}}", resetToken)
      .replace("{{name}}", user.name);
    await sendMail(user.email,emailContent);
    return res.status(200).json({ message: "ResetToken send successfully" });
  } catch (error) {
    next({ message: "Invalid Forgot Password ", error });
  }
};

export const ResetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  const user = req.user;
  try {
    const resetToken = await ResetToken.verifyResetToken(user.email, token);
    if (!resetToken) return next({ message: "Invalid reset Token", error: {} });
    await User.updatePassWord({ email: user.email, password });
    return res.status(200).json({ message: "Reset Password  successfully" });
  } catch (error) {
    next({ message: "Invalid Reset Password", error });
  }
};
