import { users } from "@/db/schemas/users/schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userLogs = pgTable("user_logs", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type").notNull(),
  data: text("data").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
