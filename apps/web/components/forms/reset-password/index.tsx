"use client";

import { Button } from "@/components/tailwind/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailwind/ui/card";
import { Input } from "@/components/tailwind/ui/input";
import { Label } from "@/components/tailwind/ui/label";
import { LOGIN_PATH } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "./actions";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;
    const token = formData.get("token") as string;

    if (!password || !password2) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      setLoading(false);
      return;
    } else if (password !== password2) {
      toast({
        title: "Erro",
        description: "As passwords não coincidem",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await resetPassword({ password, token });
      setLoading(false);
      console.log(result);
      if (result.success) {
        router.push(LOGIN_PATH);
      } else {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive",
        });
      }
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
            <h1 className="text-2xl font-bold">Redefinir password</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 p-6 md:p-8 gap-4">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="token" value={token} />
            <div className="w-full">
              <Label htmlFor="password">Password*</Label>
              <Input id="password" type="password" name="password" minLength={8} maxLength={128} required />
            </div>

            <div className="w-full">
              <Label htmlFor="password2">Confirmar Password*</Label>
              <Input id="password2" type="password" name="password2" minLength={8} maxLength={128} required />
            </div>
            <div className="flex flex-row justify-center pt-6">
              <Button className="w-44" type="submit" disabled={loading}>
                Entrar
                {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
