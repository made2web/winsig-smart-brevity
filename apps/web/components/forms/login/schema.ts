import { FORM_ERRORS } from "@/constants";
import { z } from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: `${FORM_ERRORS.fields.email.required}` })
    .min(1, { message: `${FORM_ERRORS.fields.email.required}` }),
  password: z
    .string({ required_error: `${FORM_ERRORS.fields.password.required}` })
    .min(1, { message: `${FORM_ERRORS.fields.password.required}` }),
});
