import { db } from "@/db";
import { schema } from "@/db/schemas";
import { sendEmail } from "@/emails";
import RecoverPasswordEmail from "@/emails/recover-password";
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        options: {
          from: `Winsig <${process.env.SMTP_USER}>`,
          to: user.email,
          subject: "Recuperar Password",
          html: await render(<RecoverPasswordEmail url={url} />),
        },
      });
    },
  },
  plugins: [nextCookies()],
});
