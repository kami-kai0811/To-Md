import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type UrlContextType = {
  url: string;
  setUrl: (value: string) => void;
};

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export function UrlProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState<string>("");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
}

export function useUrl() {
  const context = useContext(UrlContext);
  if (!context) throw new Error("useUrlはUrlProvider内で使用してください");
  return context;
}
