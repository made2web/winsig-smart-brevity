import { users } from "@/db/schemas/users/schema";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable(
  "sessions",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expiresAt").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("createdAt")
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updatedAt").notNull(),
  },
  (sessions) => [
    index("user_id_idx").on(sessions.userId),
    index("token_idx").on(sessions.token),
    index("expires_at_idx").on(sessions.expiresAt),
  ],
);
