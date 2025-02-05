import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { getArticleById } from "@/db/queries/article";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { GenerateButton } from "./generate-button";

interface PageProps {
  params: {
    article_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const article = await getArticleById(params.article_id);

  if (!article) {
    return (
      <div className="p-4">
        <Link href="/article" className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para artigos
        </Link>
        <h2 className="text-red-500">Artigo não encontrado</h2>
        <p>ID procurado: {params.article_id}</p>
        <p>Verifique se o ID está correto e se o artigo existe no banco de dados.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4">
      <div className="w-full max-w-screen-lg space-y-4">
        <Link href="/" className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para artigos
        </Link>
        <div className="w-full mx-auto space-y-2">
          <p>
            <strong>Problema:</strong> {article.problema}
          </p>
          <p>
            <strong>URL:</strong> {article.url}
          </p>
        </div>

        {!article.conteudo ? (
          <GenerateButton articleId={article.id} problema={article.problema} url={article.url} />
        ) : (
          <div className="w-full">
            <TailwindAdvancedEditor isLoading={false} completion={article.conteudo} articleId={article.id} />
          </div>
        )}
      </div>
    </div>
  );
}
