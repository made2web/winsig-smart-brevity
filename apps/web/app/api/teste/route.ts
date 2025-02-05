import { authClient } from "@/lib/auth/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await authClient.signUp.email({
    email: "test@example.com",
    password: "password1234",
    name: "test",
    image: "https://example.com/image.png",
  });

  console.log(data, error);

  return NextResponse.json({ data, error });
}
