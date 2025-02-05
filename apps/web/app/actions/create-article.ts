"use server";

import { createArticle } from "@/db/queries/article";
import { revalidatePath } from "next/cache";

export async function createArticleAction(data: { problema: string; url: string }) {
  try {
    const article = await createArticle({
      problema: data.problema,
      url: data.url,
    });

    revalidatePath("/");
    return { success: true, data: { id: article.id } };
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    return { success: false, error: "Erro ao criar artigo" };
  }
}
