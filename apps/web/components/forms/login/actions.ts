"use server";

import { FORM_ERRORS } from "@/constants";
import parseAuthErrors from "@/lib/auth/errors";
import { auth } from "@/lib/auth/server";
import { actionClient } from "@/lib/safe-action";
import { APIError } from "better-auth/api";
import { returnValidationErrors } from "next-safe-action";
import { loginSchema } from "./schema";

export const login = actionClient.schema(loginSchema).action(async ({ parsedInput: { email, password } }) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    if (result?.token) {
      return {
        success: true,
      };
    }

    returnValidationErrors(loginSchema, {
      email: {
        _errors: [FORM_ERRORS.fields.username.required],
      },
      password: {
        _errors: [FORM_ERRORS.fields.password.required],
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      returnValidationErrors(loginSchema, {
        _errors: [parseAuthErrors({ error })],
      });
    } else {
      returnValidationErrors(loginSchema, {
        _errors: ["Ocorreu na ligação ao servidor de login"],
      });
    }
  }
});
