import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verifications = pgTable(
  "verifications",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt")
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updatedAt").notNull(),
  },
  (verifications) => [
    index("identifier_idx").on(verifications.identifier),
    index("verifications_expires_at_idx").on(verifications.expiresAt),
  ]
);
