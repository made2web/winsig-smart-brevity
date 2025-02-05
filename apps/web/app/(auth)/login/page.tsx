import type { Metadata } from "next";

import LoginForm from "@/components/forms/login";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  return <LoginForm />;
}
