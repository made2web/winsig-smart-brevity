import RecoverPasswordForm from "@/components/forms/recover-password";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Recuperar Password",
};

export default function RecoverPasswordPage() {
  return <RecoverPasswordForm />;
}
