import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type MarkdownContextType = {
  markdown: string;
  setMarkdown: (value: string) => void;
};

const MarkdownContext = createContext<MarkdownContextType | undefined>(
  undefined,
);

export function MarkdownProvider({ children }: { children: ReactNode }) {
  const [markdown, setMarkdown] = useState<string>("");

  return (
    <MarkdownContext.Provider value={{ markdown, setMarkdown }}>
      {children}
    </MarkdownContext.Provider>
  );
}

export function useMarkdown() {
  const context = useContext(MarkdownContext);
  if (!context)
    throw new Error("useMarkdownはMarkdownProvider内で使用してください");
  return context;
}
