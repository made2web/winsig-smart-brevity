"use server";

import { FORM_ERRORS } from "@/constants";
import parseAuthErrors from "@/lib/auth/errors";
import { auth } from "@/lib/auth/server";
import { actionClient } from "@/lib/safe-action";
import { APIError } from "better-auth/api";
import { returnValidationErrors } from "next-safe-action";
import { registerSchema } from "./schema";

export const register = actionClient
  .schema(registerSchema)
  .action(
    async ({
      parsedInput: {
        name,
        email,
        password,
        username,
        type,
        isCC,
        nif,
        address,
        address2,
        postalCode,
        postalCodeDesc,
        district,
        phone,
        fax,
        mobile,
        saleConditions,
        visits,
        seller,
        financial,
        plafond,
        isParent,
        parentClient,
        sellerDesc,
        sellerEmail,
        purchases,
        deliveryType,
        mandatoryRef,
        shippingMethod,
        image,
        priceType,
        shipping,
        rgpd,
        rgpdDate,
        mkt,
        mktEvents,
        mktServices,
        mktCampaigns,
        mktNewsletter,
        mktSurveys,
        active,
      },
    }) => {
      try {
        const result = await auth.api.signUpEmail({
          body: {
            username,
            password,
            name,
            email,
            type,
            isCC,
            nif,
            address,
            address2,
            postalCode,
            postalCodeDesc,
            district,
            phone,
            fax,
            mobile,
            saleConditions,
            visits,
            seller,
            financial,
            plafond,
            isParent,
            parentClient,
            sellerDesc,
            sellerEmail,
            purchases,
            deliveryType,
            mandatoryRef,
            shippingMethod,
            image,
            priceType,
            shipping,
            rgpd,
            rgpdDate,
            mkt,
            mktEvents,
            mktServices,
            mktCampaigns,
            mktNewsletter,
            mktSurveys,
            active,
          },
        });

        if (result?.token) {
          return {
            success: true,
          };
        } else {
          returnValidationErrors(registerSchema, {
            username: {
              _errors: [FORM_ERRORS.fields.username.required],
            },
            name: {
              _errors: [FORM_ERRORS.fields.name.required],
            },
            email: {
              _errors: [FORM_ERRORS.fields.email.required],
            },
            password: {
              _errors: [FORM_ERRORS.fields.password.required],
            },
          });
        }
      } catch (error) {
        if (error instanceof APIError) {
          returnValidationErrors(registerSchema, {
            _errors: [parseAuthErrors({ error })],
          });
        } else {
          returnValidationErrors(registerSchema, {
            _errors: ["Ocorreu na ligação ao servidor de login"],
          });
        }
      }
    },
  );
