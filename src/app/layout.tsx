import "@/styles/globals.css";

import { type Metadata } from "next";
import { Logo } from "@/components/logo";
import { PostMedia } from "@/components/post-media";
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
      <body className={cn(fontNotoSansJP.className, "pb-40")}>
        <header className="bg-foreground py-5">
          <div className="mx-auto flex max-w-10/12 justify-between">
            <Logo className={"text-5xl text-white"} />
            <PostMedia />
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
