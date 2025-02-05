"use client";

import { Button } from "@/components/tailwind/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailwind/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/tailwind/ui/form";
import { Input } from "@/components/tailwind/ui/input";
import { Label } from "@/components/tailwind/ui/label";
import { RECOVER_PASSWORD_PATH } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import { type LoginFormValues, loginSchema } from "./schema";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  const { execute, isPending, status } = useAction(login, {
    onSuccess() {
      router.push("/");
    },
    onError(error) {
      toast({
        title: "Erro",
        description: error.error.validationErrors?._errors?.[0],
        variant: "destructive",
      });
    },
  });

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-center">
          <CardTitle>
            <h1 className="text-2xl font-bold">Login</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 p-6 md:p-8 gap-4">
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input id="email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          // required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row justify-center pt-6">
                <Button className="w-44" type="submit" disabled={isPending}>
                  Entrar
                  {isPending && <LoaderCircle className="w-4 h-4 animate-spin" />}
                </Button>
              </div>
              <div className="flex flex-row justify-center pt-6 text-sm">
                <Link href={RECOVER_PASSWORD_PATH}>Esqueceu-se da password?</Link>
              </div>
              {/* <div className="flex flex-row justify-center pt-6 text-sm">
                <span>Não tem conta de cliente?</span>
                <Link href={REGISTER_PATH} className="pl-1 font-bold">
                  Crie uma aqui
                </Link>
              </div> */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
