import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const createToken = (data) => {
  return Jwt.sign(data, process.env.KEY_JWT, {
    expiresIn: "15m",
  });
};
export const createRefreshToken = (email) => {
  return Jwt.sign({ email: email }, process.env.REFRESH_SECRE_TOKEN, {
    expiresIn: "7d",
  });
};

export const createEmailVerifyToken = (email) => {
  return Jwt.sign({ email: email }, process.env.EMAIL_VERIFY_TOKEN, {
    expiresIn: "1h",
  });
};
export const createResetPasswordToken = (email) => {
  return Jwt.sign({ email: email }, process.env.RESET_PASSWORD_TOKEN, {
    expiresIn: "1h",
  });
};

export const verifyRefreshToken = (refreshToken) => {
  return Jwt.verify(refreshToken, process.env.REFRESH_SECRE_TOKEN);
};

export const verifyEmailVerifyToken = (emailVerifyToken) => {
  return Jwt.verify(emailVerifyToken, process.env.EMAIL_VERIFY_TOKEN);
};

export const verifyResetPasswordToken = (ResetPasswordToken) => {
  return Jwt.verify(ResetPasswordToken, process.env.RESET_PASSWORD_TOKEN);
};
export const encrypt = (text) => {
  const { BCRYPT_SALT } = process.env;
  const salt = bcrypt.genSaltSync(parseInt(BCRYPT_SALT));
  return bcrypt.hashSync(text, salt);
};

export const compareEncrypt = (text, textCrypte) => {
  return bcrypt.compareSync(text, textCrypte);
};
