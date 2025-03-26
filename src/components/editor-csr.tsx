"use client";

import dynamic from "next/dynamic";
import { MarkdownProvider } from "@/context/markdown-context";
import { UrlProvider } from "@/context/url-context";

const Editor = dynamic(() => import("./editor").then((mod) => mod.Editor), {
  loading: () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-orange-500" />
        <p>Loading ... </p>
      </div>
    );
  },
  ssr: false,
});

export function CsrEditor() {
  return (
    <UrlProvider>
      <MarkdownProvider>
        <Editor />
      </MarkdownProvider>
    </UrlProvider>
  );
}
