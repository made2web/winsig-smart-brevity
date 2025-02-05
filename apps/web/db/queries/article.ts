import { db } from "@/db";
import { articles } from "@/db/schemas/articles/schema";
import type { NewArticle } from "@/db/schemas/articles/schema";
import { eq } from "drizzle-orm";

// Criar artigo
export async function createArticle(articleData: NewArticle) {
  try {
    const [result] = await db.insert(articles).values(articleData).returning({ id: articles.id });
    return result;
  } catch (error) {
    console.error("Falha ao criar artigo:", error);
    throw error;
  }
}

// Buscar todos os artigos
export async function getAllArticles() {
  try {
    const result = await db.select().from(articles);
    return result;
  } catch (error) {
    console.error("Falha ao buscar artigos:", error);
    throw error;
  }
}

// Buscar artigo por ID
export async function getArticleById(id: string) {
  try {
    console.log("Buscando artigo com ID:", id);

    const article = await db.select().from(articles).where(eq(articles.id, id)).limit(1);

    console.log("Resultado da busca:", article);

    return article[0] || null;
  } catch (error) {
    console.error("Erro ao buscar artigo:", error);
    return null;
  }
}

// Atualizar artigo
export async function updateArticle(id: string, articleData: Partial<NewArticle>) {
  try {
    const result = await db.update(articles).set(articleData).where(eq(articles.id, id));
    return result;
  } catch (error) {
    console.error("Falha ao atualizar artigo:", error);
    throw error;
  }
}

// Deletar artigo
export async function deleteArticle(id: string) {
  try {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return result;
  } catch (error) {
    console.error("Falha ao deletar artigo:", error);
    throw error;
  }
}
