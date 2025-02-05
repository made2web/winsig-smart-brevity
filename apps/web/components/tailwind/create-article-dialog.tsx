"use client";

import { createArticleAction } from "@/app/actions/create-article";
import { Button } from "@/components/tailwind/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/tailwind/ui/dialog";
import { Input } from "@/components/tailwind/ui/input";
import { Label } from "@/components/tailwind/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CriarArtigoDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [erros, setErros] = useState({ titulo: false, url: false });
  const router = useRouter();

  const validarCampos = () => {
    const novosErros = {
      titulo: titulo.trim() === "",
      url: url.trim() === "",
    };
    setErros(novosErros);
    return !novosErros.titulo && !novosErros.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validarCampos()) {
      try {
        const result = await createArticleAction({
          problema: titulo,
          url: url,
        });

        console.log(result);

        if (result.success) {
          // Limpar o formulário e fechar o diálogo
          setTitulo("");
          setUrl("");
          setErros({ titulo: false, url: false });
          setOpen(false);

          toast({
            title: "Sucesso!",
            description: "Artigo criado com sucesso.",
          });

          router.push(`/article/${result.data.id}`);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Erro ao criar artigo:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível criar o artigo. Tente novamente.",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0d2eff] hover:bg-[#0d2eff]/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Criar Artigo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Artigo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">
                Problema *
              </Label>
              <div className="col-span-3">
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className={erros.titulo ? "border-red-500" : ""}
                  required
                />
                {erros.titulo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />O título é obrigatório
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL *
              </Label>
              <div className="col-span-3">
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={erros.url ? "border-red-500" : ""}
                  required
                />
                {erros.url && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />A URL é obrigatória
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Criar Artigo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
