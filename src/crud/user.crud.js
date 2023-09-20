import { promisePool } from "../../database.js";
import { encrypt, compareEncrypt, createToken } from "../service/index.js";

export const create = async (data) => {
  const { email, name, password, telephone_number, id_number, role } = data;
  const passwordEncryot = encrypt(password);

  await promisePool.query(
    `INSERT INTO users (email, name, password ,telephone_number , id_number, role) VALUES ('${email}', '${name}', '${passwordEncryot}', '${telephone_number}', '${id_number}','${role}');`
  );
};
export const verifyEmail = async (email) => {

  await promisePool.query(
    `UPDATE users SET verified = true WHERE email = '${email}';`
  );
};

export const updatePassWord = async (data) => {
  const { email, password } = data;
  const passwordEncryot = encrypt(password);

  await promisePool.query(
    `UPDATE users SET password  = '${passwordEncryot}' WHERE email = '${email}';`
  );
};

export const FindAll = async () => {
  const [row] = await promisePool.query(`SELECT * FROM users`);
  if (row) return row;
  return undefined;
};

export const FindByEmail = async (email) => {
  const [[row]] = await promisePool.query(
    `SELECT * FROM users WHERE email='${email}'`
  );
  if (row) return row;
  return undefined;
};

export const FindByIdNumber = async (id_number) => {
  const [[row]] = await promisePool.query(
    `SELECT * FROM users WHERE id_number='${id_number}'`
  );
  if (row) return row;
  return undefined;
};

export const verifyUserWithRole = async (email, role) => {
  const [[row]] = await promisePool.query(
    `select users.email AS email ,roles.name AS rolename from users join roles on roles.id = users.role where users.email = '${email}' and roles.name= '${role}'`
  );
  if (row) return row;
  return undefined;
};