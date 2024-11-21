import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: '.env' });
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/auth-schema.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }, 
});

