import { Navbar } from "@/components/tailwind/navbar";
import { Toaster } from "@/components/tailwind/ui/toaster";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import type { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
      <Toaster />
    </>
  );
}
