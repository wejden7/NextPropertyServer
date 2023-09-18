import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const createToken = (data) => {
  return Jwt.sign(data, process.env.KEY_JWT, {
    expiresIn: "15m",
  });
};
export const createRefreshToken = (email) => {
  return Jwt.sign({ email: email }, process.env.REFRESH_SECRE_TKEY, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (refreshToken) => {
  return Jwt.verify(refreshToken, process.env.REFRESH_SECRE_TKEY);
};
export const encrypt = (text) => {
  const { BCRYPT_SALT } = process.env;
  const salt = bcrypt.genSaltSync(parseInt(BCRYPT_SALT));
  return bcrypt.hashSync(text, salt);
};

export const compareEncrypt = (text, textCrypte) => {
  return bcrypt.compareSync(text, textCrypte);
};
