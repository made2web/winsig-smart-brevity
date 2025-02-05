import { authClient } from "@/lib/auth/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await authClient.signUp.email({
    email: "filipe.pequito@made2web.com",
    password: "Filipe2025#",
    name: "test",
    image: "https://example.com/image.png",
  });

  const { data: data2, error: error2 } = await authClient.signUp.email({
    email: "ana.lopes@winsig.pt",
    password: "Ana2025#",
    name: "test",
    image: "https://example.com/image.png",
  });

  console.log(data, error);

  return NextResponse.json({ data, error });
}
