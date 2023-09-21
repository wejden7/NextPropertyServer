import * as User from "../crud/user.crud.js";
import * as Role from "../crud/role.crud.js";
import * as Service from "../service/index.js";

export const FindAllUser = async (req, res, next) => {
  try {
    const roles = await Role.FindAll();
    const result = [];
    for (const role of roles) {
      if (role.name != "admin") {
        const users = await User.FindByRole(role.id);
        result.push({ roleID: role.id, roleName: role.name, users: users });
      }
    }
    res.status(200).json({ users: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const ToggleBlockedUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    await User.ToggleBlocked(id);

    res.status(200).json("Toggle Blocked ");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const FindAllAgent = async (req, res, next) => {
  try {
    const users = await User.FindByRole(2);

    res.status(200).json({ agent: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const FindProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const profile = await User.FindByEmail(user.email);

    res.status(200).json({ profile: profile });
  } catch (error) {
    console.log(error)
    next({ message: "Find Profile Invalide", error: error });
  }
};

export const UpdateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const idNumberExiste = await User.IdNumberExiste(
      user.email,
      data.id_number
    );
    const telephoneExiste = await User.TelephoneExiste(
      user.email,
      data.telephone_number
    );
    if (idNumberExiste) return next({ message: "Id Number Existe " });
    if (telephoneExiste) return next({ message: "Telephone Number Existe " });

    await User.update(user.email, data);
    const token = Service.createToken({ email: data.email, name: data.name });
    const refreshToken = Service.createRefreshToken(data.email);

    return res.status(200).json({
      message: "Update Profile",
      token,
      refreshToken,
    });
  } catch (error) {
    next({ message: "Update Profile Invalide", error: error });
  }
};

export const UpdatePassWord = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { oldpassword, newpassword } = req.body;

    const user = await User.FindByEmail(email);
    if (!Service.compareEncrypt(oldpassword, user.password))
      return next({ message: "Password not Valide", error: "" });

    await User.updatePassWord({ email: user.email, password: newpassword });

    res.status(200).json("Update Passwor Valid");
  } catch (error) {
    return next({ message: "InValide Update password", error: error });
  }
};
