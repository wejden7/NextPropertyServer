import passport from "passport";

export const JwtMiddleware = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});
