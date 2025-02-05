"use server";

import parseAuthErrors from "@/lib/auth/errors";
import { auth } from "@/lib/auth/server";
import { APIError } from "better-auth/api";

export async function resetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  const response = {
    success: false,
    message: "",
  };

  try {
    const result = await auth.api.resetPassword({
      body: {
        newPassword: password,
        token: token,
      },
    });

    console.log("action res", result);

    if (result?.status) {
      response.success = true;
      response.message = "Password redefinida com sucesso";
    } else {
      response.message = "Erro ao redefinir password";
    }

    return response;
  } catch (error) {
    if (error instanceof APIError) {
      response.message = parseAuthErrors({ error });
      return response;
    } else {
      response.message = "Ocorreu com a redefinição da password";
      return response;
    }
  }
}
