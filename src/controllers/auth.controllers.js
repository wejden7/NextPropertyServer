import * as User from "../crud/user.crud.js";
import {
  compareEncrypt,
  createToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../service/index.js";
import passport from "passport";

export default passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

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

    if (!compareEncrypt(password, user.password))
      return res.status(404).json("Not Found p");

    const token = createToken({ email: user.email, name: user.name });
    const refreshToken = createRefreshToken(user.email);

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

export const RefreshToken = async (req, res,next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = User.FindByEmail(decoded.email);
    if (!user) {
      next({ message: "Invalid refresh token" });
    }

    const accessToken = createToken({ email: user.email, name: user.name });

    res.status(200).json({ accessToken });
  } catch (error) {
    next({ message: "Invalid refresh token" });
  }
};
