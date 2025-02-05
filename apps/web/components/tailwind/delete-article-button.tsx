"use client";

import { deleteArticleAction } from "@/app/actions/delete-article";
import { Button } from "@/components/tailwind/ui/button";
import { useState } from "react";

interface DeleteArticleButtonProps {
  articleId: string;
}

export function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja eliminar este artigo?")) {
      setIsDeleting(true);
      try {
        const result = await deleteArticleAction(articleId);
        if (!result.success) {
          alert("Erro ao eliminar artigo");
        }
      } catch (error) {
        console.error("Erro ao eliminar artigo:", error);
        alert("Erro ao eliminar artigo");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      className="bg-red-600 hover:bg-red-700"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "A eliminar..." : "Eliminar"}
    </Button>
  );
}
