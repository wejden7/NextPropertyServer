import { promisePool } from "../../database.js";

export const create = async (data) => {
  const { email, token } = data;

  await promisePool.query(
    `INSERT INTO reset_token (email, token) VALUES ('${email}', '${token}');`
  );
};

export const verifyResetToken = async (email, token) => {
  const [[row]] = await promisePool.query(
    `SELECT * FROM reset_token WHERE email='${email}' and token='${token}' and TIMESTAMPDIFF(MINUTE, created_at, NOW()) <= 60`
  );
  await promisePool.query(`DELETE FROM reset_token WHERE email='${email}' `);
  if (row) {
    return row;
  }
  return undefined;
};
