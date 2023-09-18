import dotenv from "dotenv";

dotenv.config();

const { POOL_HOST, POOL_USER, POOL_PASS, POOL_DB } = process.env;

export const development = {
  client: "mysql2",
  connection: {
    host: POOL_HOST,
    user: POOL_USER,
    password: POOL_PASS,
    database: POOL_DB,
  },
  migrations: {
    directory: "./src/migrations",
  },
};
