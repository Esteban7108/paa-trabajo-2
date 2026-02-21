import pg from "pg";

export const pool = new pg.Pool({
  host: "postgres-service",
  port: 5432,
  database: "animalesdb",
  user: "root",
  password: "root",
});
