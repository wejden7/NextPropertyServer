import * as User from "../crud/user.crud.js";

export const Authorization = (tagsRole, TagsPermition) => {
  return async (req, res, next) => {
    let { user } = req;
    console.log(tagsRole);
    for (const role of tagsRole) {
      const result = await User.verifyUserWithRole(user.email, role);
      if(result) return next()
      console.log(result);
    }
    console.log(TagsPermition);

    return next("Not Authorize ");
  };
};
