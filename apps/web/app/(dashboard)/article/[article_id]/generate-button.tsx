"use client";

import { saveArticle } from "@/app/actions/save-article";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { useCompletion } from "ai/react";
import { useState } from "react";

interface GenerateButtonProps {
  articleId?: string;
  problema?: string;
  url?: string;
}

export function GenerateButton({ articleId, problema, url }: GenerateButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { complete, isLoading, completion } = useCompletion({
    api: "/api/completion",
    onFinish: async (prompt: string, completion: string) => {
      if (articleId) {
        const result = await saveArticle(articleId, completion);
        if (!result.success) {
          console.error("Erro ao salvar o artigo:", result.error);
        }
      }
    },
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await complete({
        problema: problema,
        solucao: url,
      });
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-screen-lg flex flex-col justify-center">
      <div className="max-w-56 mx-auto">
        {!isLoading && !completion && (
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
            type="button"
          >
            {isLoading ? "A gerar conteúdo..." : "Gerar conteúdo"}
          </button>
        )}
      </div>

      {(isLoading || completion) && (
        <TailwindAdvancedEditor isLoading={isLoading} completion={completion} articleId={articleId} />
      )}
    </div>
  );
}
