import * as User from "../crud/user.crud.js";

export const FindAllUser = async (req, res, next) => {
  try {
    console.log("wejden",req.user)
    const users = await User.FindAll();
    console.log(users);
    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};
