import JWT from "passport-jwt";
import dotenv from "dotenv";
import { promisePool } from "./database.js";

dotenv.config();

const { Strategy: JwtStrategy, ExtractJwt } = JWT;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY_JWT,
};

export default new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    if (jwt_payload) {
      const [[row]] = await promisePool.query(
        `SELECT * FROM users WHERE email='${jwt_payload.email}'`
      );

      if (row) {
        console.log(
          `${jwt_payload.name} with email${jwt_payload.email} is Auth `
        );
        return done(null, jwt_payload);
      }
      return done(
        {
          name: "AuthenticationError",
          message: "Unauthorized",
          status: 401,
        },
        false
      );
    } else {
      return done(true, false);
      // or you could create a new account
    }
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
});
