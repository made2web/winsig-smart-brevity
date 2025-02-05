import SignOut from "@/components/sign-out";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { Logo } from "./logo";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        {session && <SignOut />}
      </div>
    </nav>
  );
}
