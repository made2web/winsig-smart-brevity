import { LOGIN_PATH, RECOVER_PASSWORD_PATH, REGISTER_PATH, RESET_PASSWORD_PATH } from "@/constants";
import type { auth } from "@/lib/auth/server";
import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
  const publicPaths = [LOGIN_PATH, REGISTER_PATH, RECOVER_PASSWORD_PATH, RESET_PASSWORD_PATH];

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
