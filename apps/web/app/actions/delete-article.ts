"use server";

import { deleteArticle } from "@/db/queries/article";
import { revalidatePath } from "next/cache";

export async function deleteArticleAction(id: string) {
  try {
    await deleteArticle(id);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar artigo:", error);
    return { success: false, error: "Falha ao deletar artigo" };
  }
}
