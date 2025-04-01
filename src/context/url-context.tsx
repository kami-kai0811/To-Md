import { createContext, useContext, useState } from "react";

type UrlMap = Record<string, string>;

type UrlContextType = {
  urls: UrlMap;
  setUrl: (blockId: string, url: string) => void;
};

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export function UrlProvider({ children }: { children: React.ReactNode }) {
  const [urls, setUrls] = useState<UrlMap>({});

  function setUrl(blockId: string, url: string) {
    setUrls((prev) => ({
      ...prev,
      [blockId]: url,
    }));
  }

  return (
    <UrlContext.Provider value={{ urls, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
}

export function useUrl() {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrl must be used within a UrlProvider");
  }
  return context;
}
