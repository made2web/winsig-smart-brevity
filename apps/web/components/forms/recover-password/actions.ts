"use server";

import parseAuthErrors from "@/lib/auth/errors";
import { auth } from "@/lib/auth/server";
import { APIError } from "better-auth/api";

export async function recoverPassword({ email }: { email: string }) {
  const response = {
    success: false,
    message: "",
  };
  try {
    const result = await auth.api.forgetPassword({
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });

    if (result?.status) {
      response.success = true;

      response.message = "Foi-lhe enviado um email com indicações para recuperar a password";
    } else {
      response.message = "O seu email não se encontra registado.";
    }

    return response;
  } catch (error) {
    if (error instanceof APIError) {
      response.message = parseAuthErrors({ error });
      return response;
    } else {
      response.message = "Ocorreu na recuperação de password.";
      return response;
    }
  }
}
