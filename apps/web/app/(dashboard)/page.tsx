import Link from "next/link";

import { CriarArtigoDialog } from "@/components/tailwind/create-article-dialog";
import { DeleteArticleButton } from "@/components/tailwind/delete-article-button";
import { Button } from "@/components/tailwind/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/tailwind/ui/table";
import { getAllArticles } from "@/db/queries/article";

// Removemos o "use client" e mantemos como componente do servidor
export default async function PainelArtigos() {
  const artigos = await getAllArticles();

  return (
    <div className="container mx-auto py-10 font-nunito">
      <div className="flex justify-end mb-6">
        <CriarArtigoDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Problema</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artigos.map((artigo) => (
              <TableRow key={artigo.id}>
                <TableCell className="font-medium">{artigo.problema}</TableCell>
                <TableCell>{artigo.url}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2 border-[#0d2eff] text-[#0d2eff] hover:bg-[#0d2eff] hover:text-white"
                    asChild
                  >
                    <Link href={`/article/${artigo.id}`}>Editar</Link>
                  </Button>
                  <DeleteArticleButton articleId={artigo.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
