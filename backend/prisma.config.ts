import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", // path to your schema
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
    // If you use a shadow database:
    shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
  },
  // other config options ...
});
