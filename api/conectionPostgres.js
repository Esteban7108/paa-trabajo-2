import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
