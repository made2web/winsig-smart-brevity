import { Nunito } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import "katex/dist/katex.min.css";
import { Toaster } from "@/components/tailwind/ui/toaster";
import { auth } from "@/lib/auth/server";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

const title = "Winsig - Smart Brevity";
import Providers from "./providers";
const description = "Winsig - Software de Gestão.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@steventey",
  },
  metadataBase: new URL("https://www.winsig.pt/"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
