import type { LinkCardProps } from "@/types/link-cart-props";
import { useState } from "react";
import { useUrl } from "@/context/url-context";
import { LoaderCircle, Send } from "lucide-react";

import { Button } from "../ui/button";
import { LinkCard } from "./embed-link-card";

export function EmbedBlockContent({ block }: { block: { id: string } }) {
  const { urls, setUrl } = useUrl();

  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<LinkCardProps>({
    title: "",
    description: "",
    image: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputUrl = urls[block.id] || ""; // このブロック専用のURLを取得

  async function onClick() {
    setIsLoading(true);
    try {
      setError(null);

      const res = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl }), // ← ブロックごとのURLだけを送信
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { link, meta } = (await res.json()) as {
        link: string;
        meta: LinkCardProps;
      };

      setLink(link);
      setMeta(meta);
    } catch (err: unknown) {
      console.error(err);
      let message = "埋め込みに失敗しました";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    }
    setIsLoading(false);
  }

  return (
    <>
      {link ? (
        <LinkCard meta={meta} link={link} />
      ) : (
        <div className="flex w-full flex-col gap-2 rounded border bg-white p-4 shadow">
          <input
            type="text"
            className="rounded-md border border-gray-500 p-2"
            value={inputUrl}
            onChange={(e) => setUrl(block.id, e.target.value)} // block.idで個別管理
            placeholder="URLを入力"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button className="cursor-pointer" onClick={onClick}>
            {isLoading && <LoaderCircle className="animate-spin" />}
            埋め込む
            <Send />
          </Button>
        </div>
      )}
    </>
  );
}
