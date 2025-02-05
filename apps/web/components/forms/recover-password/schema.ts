import { z } from "zod";

export const formRecoverPasswordSchema = z.object({
  email: z.string().email(),
});
