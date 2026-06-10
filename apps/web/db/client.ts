import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn(
    "[db] DATABASE_URL is not set — queries will fail. See .env.example."
  );
}

declare global {
  // eslint-disable-next-line no-var
  var __familyOsSql: ReturnType<typeof postgres> | undefined;
}

const sql =
  global.__familyOsSql ??
  postgres(url ?? "postgres://placeholder", {
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") global.__familyOsSql = sql;

export const db = drizzle(sql, { schema });
export { schema };
