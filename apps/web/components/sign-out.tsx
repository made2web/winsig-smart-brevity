"use client";

import { Button } from "@/components/tailwind/ui/button";
import { LOGIN_PATH } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth/client";
import parseAuthErrors from "@/lib/auth/errors";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push(LOGIN_PATH);
        },
        onError: (ctx) => {
          setLoading(false);
          toast({
            title: "Erro",
            description: parseAuthErrors({ error: ctx.error }),
            variant: "destructive",
          });
        },
      },
    });
  }

  return (
    <Button onClick={handleSignOut} disabled={loading}>
      Sign Out
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
}
