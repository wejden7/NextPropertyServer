import mysql from "mysql2" ;
import dotenv from "dotenv";

dotenv.config();

const { POOL_HOST, POOL_USER, POOL_PASS, POOL_DB } = process.env;

export const pool = mysql.createPool({
  host: POOL_HOST,
  user: POOL_USER,
  password: POOL_PASS,
  database: POOL_DB,
});

export const promisePool = pool.promise();
