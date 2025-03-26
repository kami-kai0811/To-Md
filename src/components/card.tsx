import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";

export function MenuCard({
  markdown,
  toggle,
}: {
  markdown: string;
  toggle: [
    isMarkdown: boolean,
    setIsMarkdown: Dispatch<SetStateAction<boolean>>,
  ];
}) {
  const [isCard, setIsCard] = useState<boolean>(true);
  const [isMarkdown, setIsMarkdown] = toggle;
  async function clickHandler() {
    try {
      await navigator.clipboard.writeText(markdown);
      toast("コピーしました");
    } catch (error) {
      alert("失敗しました。");
      toast("コピーに失敗しました", { description: String(error) });
    }
  }
  return (
    <>
      {isCard ? (
        <Card>
          <ChevronDown
            className="absolute top-0 left-0 cursor-pointer"
            onClick={() => {
              setIsCard(!isCard);
            }}
          />
          <CardHeader>
            <CardTitle>メニュー</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setIsMarkdown(!isMarkdown);
              }}
            >
              マークダウンを
              {isMarkdown ? "非表示" : "表示"}
            </Button>
          </CardContent>
          <CardContent>
            <Button
              className="mx-auto cursor-pointer p-1"
              onClick={async () => {
                await clickHandler();
              }}
            >
              <Copy />
              Markdownをコピー
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button
          className="cursor-pointer"
          onClick={() => {
            setIsCard(!isCard);
          }}
        >
          メニュー
        </Button>
      )}
    </>
  );
}
