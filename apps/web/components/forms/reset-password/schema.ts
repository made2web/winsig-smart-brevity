import { z } from "zod";

export const formResetPasswordSchema = z.object({
  password: z.string().min(8).max(128),
  password2: z.string().min(8).max(128),
});
