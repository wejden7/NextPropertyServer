import { promisePool } from "../../database.js";

export const FindById = async (id) => {
  const [[row]] = await promisePool.query(
    `SELECT * FROM roles WHERE id='${id}'`
  );
  if (row) return row;
  return undefined;
};

export const FindAll = async () => {
  const [row] = await promisePool.query(`SELECT * FROM roles`);
  if (row) return row;
  return undefined;
};

export const verifyRoleEmailWithPermition = async (email, permission) => {
  const [[row]] = await promisePool.query(
    `select email,table1.role AS role,permission from (select r.id AS roleID,r.name AS role,p.name AS permission from role_permissions AS rp join permissions AS p on rp.permission = p.id join roles AS r on rp.role = r.id) AS table1 join users on users.role = table1.roleID where users.email = '${email}' and table1.permission = '${permission}';`
  );
  if (row) return row;
  return undefined;
};

