"use client";

import "@blocknote/core/fonts/inter.css";

import { BlockNoteView } from "@blocknote/mantine";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import "@blocknote/mantine/style.css";

import { useState } from "react";
import { locales } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "./ui/button";

export function Editor() {
  // Stores the editor's contents as Markdown.
  const [markdown, setMarkdown] = useState<string>("");
  const [title, setTitile] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isMarkdown, setIsMarkdown] = useState<boolean>(true);
  const locale = locales.ja;

  //画像アップロード機能
  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: body,
    });

    const json = (await res.json()) as { url: string; error?: string };

    if (!res.ok) {
      throw new Error(json.error ?? "アップロード失敗");
    }
    return json.url;
  }

  // Creates a new editor instance with some initial content.
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: "ここから書き始める、コマンドは半角の「/」を押す",
        default: "ここに入力、コマンドは半角の「/」を押す",
      },
    },
    tabBehavior: "prefer-navigate-ui",
    tables: {
      headers: true,
      splitCells: true,
    },
    uploadFile,
  });

  async function onChange() {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);
  }

  async function clickHandler() {
    const message = markdown;
    try {
      await navigator.clipboard.writeText(message);
      toast("コピーしました");
    } catch (error) {
      alert("失敗しました。");
      toast("コピーに失敗しました", { description: String(error) });
    }
  }

  // Renders the editor instance, and its contents as Markdown below.
  return (
    <>
      <div className="mx-auto mt-2 flex flex-col gap-2">
        <div className="mx-auto flex w-full justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-primary/70 text-xs font-semibold">
              編集エリア
            </span>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "非表示" : "表示"}
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-primary/70 text-xs font-semibold">
              マークダウン
            </span>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setIsMarkdown(!isMarkdown);
              }}
            >
              {isMarkdown ? "非表示" : "表示"}
            </Button>
          </div>
        </div>
        <Button
          className="mx-auto cursor-pointer p-1"
          onClick={async () => {
            await clickHandler();
          }}
        >
          <Copy />
          Markdownをコピー
        </Button>
        <div className="text-primary/70 flex flex-col">
          <small>※マークダウン表示は編集できません。</small>
          <small>※タイトルはマークダウン表示されません。</small>
        </div>
      </div>

      <div
        className={`wrapper flex h-full min-h-screen flex-col md:grid`}
        style={{
          gridTemplateColumns: ` ${isEdit ? "1fr " : ""} ${isEdit && isMarkdown ? "3px" : ""} ${isMarkdown ? " 1fr" : ""}`,
        }}
      >
        {isEdit && (
          <div className="flex flex-col gap-3 pt-5">
            <div className="text-2xl font-bold">編集エリア</div>

            <TextareaAutosize
              placeholder="ここにタイトルを入力"
              className="mx-auto w-10/12 resize-none py-5 text-center text-2xl focus:outline-none"
              onChange={(e) => {
                setTitile(e.target.value);
              }}
              value={title}
            />
            <div className={"item mx-auto w-10/12"}>
              <BlockNoteView editor={editor} onChange={onChange} />
            </div>
          </div>
        )}

        {isEdit && isMarkdown && (
          <div className="bg-primary/30 h-full w-full" />
        )}

        {isMarkdown && (
          <div className="mx-auto flex max-w-10/12 flex-col gap-3 pt-5">
            <div className="relative flex items-center justify-center">
              <h2 className="w-full text-center text-2xl font-bold">
                マークダウン表示
              </h2>
            </div>
            <div
              className={`placeholder:タイトル decorat mx-auto my-3.5 inline-block px-2 text-center text-2xl font-bold underline decoration-black decoration-2 underline-offset-5`}
            >
              {title || <span className="opacity-40">タイトル</span>}
            </div>
            <div className={"item bordered"}>
              <pre className="break-all whitespace-pre-wrap">
                <code>{markdown}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
