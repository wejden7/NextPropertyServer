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

export const update = async (myEmail, data) => {
  const { email, name, telephone_number, id_number } = data;

  await promisePool.query(
    `UPDATE users SET email='${email}',name='${name}',telephone_number='${telephone_number}',id_number='${id_number}' WHERE email = '${myEmail}';`
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
    `select users.id AS id, users.email AS email ,roles.name AS rolename from users join roles on roles.id = users.role where users.email = '${email}' and roles.name= '${role}'`
  );
  if (row) return row;
  return undefined;
};

export const FindByRole = async (role) => {
  const [row] = await promisePool.query(
    `SELECT id, email,name,telephone_number,id_number,blocked,verified  FROM users WHERE role='${role}'`
  );
  if (row) return row;
  return undefined;
};

export const ToggleBlocked = async (id) => {
  await promisePool.query(
    `UPDATE users SET blocked  = CASE WHEN blocked = true THEN false ELSE true END WHERE id = ${id}`
  );
};

export const IdNumberExiste = async (email,id)=>{
  const [row] = await promisePool.query(
    `select * from users where email !='${email}' and id_number ='${id}'`
  );
  if (row.length>0) return row;
  return undefined;
}

export const TelephoneExiste = async (email,tel)=>{
  const [row] = await promisePool.query(
    `select * from users where email !='${email}' and telephone_number ='${tel}'`
  );
  if (row.length>0) return row;
  return undefined;
}

