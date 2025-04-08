import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_AbPwOcus47hi@ep-dawn-term-a5qysztl-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
});
