import ResetPasswordForm from "@/components/forms/reset-password";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Redefinir Password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;

  if (!token) {
    notFound();
  }

  return <ResetPasswordForm token={token} />;
}
