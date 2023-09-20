import * as User from "../crud/user.crud.js";
import * as Role from "../crud/role.crud.js";

export const Authorization = (tagsRole, TagsPermition) => {
  return async (req, res, next) => {
    let { user } = req;
    //console.log(tagsRole);
    for (const role of tagsRole) {
      const result = await User.verifyUserWithRole(user.email, role);
      if (result) console.log(`${user.email} is ${role} Authorize`);
      if (result) return next();
    }
    // console.log(TagsPermition);
    for (const permition of TagsPermition) {
      const result = await Role.verifyRoleEmailWithPermition(
        user.email,
        permition
      );
      if (result)
        console.log(
          `${user.email} have ${permition} permition donc is Authorize`
        );
      if (result) return next();
    }

    return next("Not Authorize ");
  };
};
