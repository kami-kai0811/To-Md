import "@/styles/globals.css";

import { type Metadata } from "next";
import { Logo } from "@/components/header/logo";
import { PostMedia } from "@/components/header/post-media";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { fontNotoSansJP } from "@/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Markdown"],
  authors: {
    name: "kamiya",
  },
  openGraph: {
    type: "website",
    locale: "ja",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(fontNotoSansJP.className, "bg-[#1f1f1f] pb-40")}>
        <header className="fixed top-0 right-0 left-0 z-30 bg-gray-400 py-5">
          <div className="mx-auto flex max-w-10/12 justify-between">
            <Logo className={"text-5xl text-white"} />
            <PostMedia />
          </div>
        </header>
        <div className="mt-28">{children}</div>
        <Toaster className="absolute bottom-3 left-3" />
      </body>
    </html>
  );
}
