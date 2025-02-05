import { sql } from "@vercel/postgres";
import { drizzle as drizzleSql } from "drizzle-orm/mysql2";
import { drizzle } from "drizzle-orm/vercel-postgres";
import mysql from "mysql2/promise";

export const db = drizzle(sql);

export const dbSql = drizzleSql(
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || "3306"),
  })
);
