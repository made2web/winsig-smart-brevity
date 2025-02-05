import type { InferModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  problema: text("problema").notNull(),
  url: text("url").notNull(),
  conteudo: text("conteudo"),
  urlContent: text("url_content"),
  createdAt: timestamp("createdAt")
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updatedAt").$onUpdateFn(() => new Date()),
});

// Tipos inferidos do schema
export type Article = InferModel<typeof articles>;
export type NewArticle = InferModel<typeof articles, "insert">;
