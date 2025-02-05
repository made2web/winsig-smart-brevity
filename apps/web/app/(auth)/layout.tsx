import { Logo } from "@/components/tailwind/logo";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full grid grid-cols-2 py-2">
      <div className="w-full">
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
}
