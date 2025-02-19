import "@/db/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schemas/**/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
