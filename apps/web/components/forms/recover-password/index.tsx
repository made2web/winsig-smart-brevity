"use client";

import { Button } from "@/components/tailwind/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailwind/ui/card";
import { Input } from "@/components/tailwind/ui/input";
import { Label } from "@/components/tailwind/ui/label";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { recoverPassword } from "./actions";

export default function RecoverPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      toast({
        title: "Erro",
        description: "O campo email é obrigatório",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await recoverPassword({ email });

      if (result.success) {
        toast({
          title: "Sucesso",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-center">
          <CardTitle>
            <h1 className="text-2xl font-bold">Recuperar Password</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 p-6 md:p-8 gap-4">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <Label htmlFor="email">Email*</Label>
              <Input required id="email" type="email" name="email" />
            </div>
            <div className="flex flex-row justify-center pt-6">
              <Button className="w-44" type="submit" disabled={loading}>
                Recuperar Password
                {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
