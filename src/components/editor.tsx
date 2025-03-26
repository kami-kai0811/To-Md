"use client";

import "@blocknote/core/fonts/inter.css";

import { useMarkdown } from "@/context/markdown-context";
import { useUrl } from "@/context/url-context";
import { BlockNoteView } from "@blocknote/mantine";

import { MenuCard } from "./card";
import { insertEmbed } from "./insert-embed";

import "@blocknote/mantine/style.css";

import { useState } from "react";
import { schema } from "@/config/block-schema";
import { uploadFile } from "@/lib/image-upload";
import { filterSuggestionItems, locales } from "@blocknote/core";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import TextareaAutosize from "react-textarea-autosize";

export function Editor() {
  // Stores the editor's contents as Markdown.
  const { markdown, setMarkdown } = useMarkdown();
  const { url } = useUrl();
  const [title, setTitile] = useState<string>("");
  const [isMarkdown, setIsMarkdown] = useState<boolean>(true);
  const locale = locales.ja;

  // Creates a new editor instance with some initial content.
  const editor = useCreateBlockNote({
    schema,
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
    const markdownArrayPromises = editor.document.map(async (block) => {
      if (block.type === "embed") {
        return `${url}\n`;
      } else {
        return await editor.blocksToMarkdownLossy([block]);
      }
    });

    // 全てのPromiseが解決するのを待つ
    const markdownArray = await Promise.all(markdownArrayPromises);
    const editorMarkdown = markdownArray.join("");

    setMarkdown(editorMarkdown);
  }

  // Renders the editor instance, and its contents as Markdown below.
  return (
    <>
      <div className="mx-auto my-2 flex flex-col gap-2">
        <div className="text-primary/70 flex flex-col">
          <small>※マークダウン表示は編集できません。</small>
          <small>※タイトルはマークダウン表示されません。</small>
        </div>
      </div>

      <div
        className={`wrapper flex h-full min-h-screen flex-col md:grid`}
        style={{
          gridTemplateColumns: isMarkdown ? "1fr 3px 1fr" : "1fr",
        }}
      >
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
          <div
            className={`item mx-auto text-center ${isMarkdown ? "w-10/12" : "w-7/12"}`}
          >
            <BlockNoteView
              editor={editor}
              onChange={onChange}
              slashMenu={false}
            >
              <SuggestionMenuController
                triggerCharacter="/"
                getItems={async (query) =>
                  filterSuggestionItems(
                    [
                      ...getDefaultReactSlashMenuItems(editor),
                      insertEmbed(editor),
                    ],
                    query,
                  )
                }
              />
            </BlockNoteView>
          </div>
        </div>

        {isMarkdown && <div className="bg-primary/30 h-full w-full" />}

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
      <div className="fixed right-5 bottom-5">
        <MenuCard markdown={markdown} toggle={[isMarkdown, setIsMarkdown]} />
      </div>
    </>
  );
}
