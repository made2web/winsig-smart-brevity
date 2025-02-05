import { FORM_ERRORS } from "@/constants";
import { z } from "zod";

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  username: z
    .string({ required_error: `${FORM_ERRORS.fields.username.required}` })
    .min(1, { message: `${FORM_ERRORS.fields.username.required}` }),
  password: z
    .string({ required_error: `${FORM_ERRORS.fields.password.required}` })
    .min(8, { message: `${FORM_ERRORS.fields.password.tooShort}` })
    .max(128, { message: `${FORM_ERRORS.fields.password.tooLong}` }),
  type: z.string().optional(),
  isCC: z.boolean(),
  name: z.string({ required_error: `${FORM_ERRORS.fields.name.required}` }),
  email: z
    .string({ required_error: `${FORM_ERRORS.fields.email.required}` })
    .email({ message: `${FORM_ERRORS.fields.email.invalid}` }),
  nif: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number())
    .optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  postalCode: z.string().optional(),
  postalCodeDesc: z.string().optional(),
  district: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  mobile: z.string().optional(),
  saleConditions: z.string().optional(),
  visits: z.number().optional(),
  seller: z.string().optional(),
  financial: z.string().optional(),
  plafond: z.string().optional(),
  isParent: z.boolean(),
  parentClient: z.string().optional(),
  sellerDesc: z.string().optional(),
  sellerEmail: z.string().optional(),
  purchases: z.string().optional(),
  deliveryType: z.string().optional(),
  mandatoryRef: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((val) => val === true || val === "true")
    .optional(),
  shippingMethod: z.string().optional(),
  image: z.string().optional(),
  priceType: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number())
    .optional(),
  shipping: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number())
    .optional(),
  rgpd: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((val) => val === true || val === "true")
    .optional(),
  rgpdDate: z.string().optional(),
  mkt: z.boolean().optional(),
  mktEvents: z.boolean().optional(),
  mktServices: z.boolean().optional(),
  mktCampaigns: z.boolean().optional(),
  mktNewsletter: z.boolean().optional(),
  mktSurveys: z.boolean().optional(),
  active: z.boolean().optional(),
});
