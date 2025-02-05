"use server";

import { db } from "@/db";
import { articles } from "@/db/schemas/articles/schema";
import { eq } from "drizzle-orm";

export async function saveArticle(articleId: string, content: string) {
  try {
    await db.update(articles).set({ conteudo: content }).where(eq(articles.id, articleId));
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar artigo:", error);
    return { success: false, error };
  }
}
