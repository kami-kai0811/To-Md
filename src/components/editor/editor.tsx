"use client";

import "@blocknote/core/fonts/inter.css";

import { useUrl } from "@/context/url-context";
import { BlockNoteView } from "@blocknote/mantine";

import { insertEmbed } from "../embed-link-block/insert-embed";
import { MenuCard } from "./card";

import "@blocknote/mantine/style.css";

// import "./style.css";

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
  const [markdown, setMarkdown] = useState<string>("");
  const { url } = useUrl();
  const [title, setTitile] = useState<string>("");
  const [markdownDisplay, setmarkdownDisplay] = useState<boolean>(true);
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

  let listNum = 0;
  async function convertBlocksToMarkdown(
    blocks: typeof editor.document,
    depth = 0,
  ): Promise<string> {
    let markdown = "";

    for (const block of blocks) {
      const indent = "  ".repeat(depth);

      switch (block.type) {
        case "embed":
          listNum = 0;
          markdown += `\n${url}\n`;
          break;

        case "numberedListItem":
          listNum += 1;
          const numberedContent = block.content[0];
          const numberedText =
            numberedContent && "text" in numberedContent
              ? numberedContent.text
              : "";
          markdown += `${indent}${listNum}. ${numberedText}\n`;
          if (block.children.length) {
            listNum = 0;
            markdown += await convertBlocksToMarkdown(
              block.children,
              depth + 1,
            );
          }
          break;

        case "bulletListItem":
          listNum = 0;
          const bulletContent = block.content[0];
          const bulletText =
            bulletContent && "text" in bulletContent ? bulletContent.text : "";
          markdown += `${indent}- ${bulletText}\n`;
          if (block.children.length) {
            markdown += await convertBlocksToMarkdown(
              block.children,
              depth + 1,
            );
          }
          break;

        default:
          listNum = 0;
          markdown += "\n";
          markdown += await editor.blocksToMarkdownLossy([block]);
          break;
      }
    }

    return markdown;
  }
  async function onChange() {
    const editorMarkdown = await convertBlocksToMarkdown(editor.document);
    setMarkdown(editorMarkdown);
  }

  // async function onChange() {
  //   // Converts the editor's contents from Block objects to Markdown and store to state.
  //   console.log(editor.document);
  //   console.log(listNum);
  //   const markdownArrayPromises = editor.document.map(async (block) => {
  //     if (block.type === "embed") {
  //       listNum = 0;
  //       return `${url}\n`;
  //     } else if (block.type === "numberedListItem") {
  //       listNum += 1;
  //       const firstContent = block.content[0];
  //       if (firstContent && "text" in firstContent)
  //         return `${listNum}. ${firstContent.text}\n`;
  //     } else {
  //       listNum = 0;
  //       return await editor.blocksToMarkdownLossy([block]);
  //     }
  //   });

  //   // 全てのPromiseが解決するのを待つ
  //   const markdownArray = await Promise.all(markdownArrayPromises);
  //   const editorMarkdown = markdownArray.join("");

  //   setMarkdown(editorMarkdown);
  // }

  // Renders the editor instance, and its contents as Markdown below.
  return (
    <>
      <div className="my-2 flex flex-col text-center text-[#cfcfcf]">
        <small>※マークダウン表示は編集できません。</small>
        <small>※タイトルはマークダウン表示されません。</small>
      </div>

      <div
        className={`wrapper flex min-h-screen flex-col md:grid`}
        style={{
          gridTemplateColumns: markdownDisplay ? "1fr 3px 1fr" : "1fr",
        }}
      >
        <div className="flex flex-col gap-3 pt-5">
          <div className="text-center text-2xl font-bold text-white">
            編集エリア
          </div>

          <TextareaAutosize
            placeholder="ここにタイトルを入力"
            className="mx-auto w-10/12 resize-none py-5 text-center text-2xl text-[#cfcfcf] focus:outline-none"
            onChange={(e) => {
              setTitile(e.target.value);
            }}
            value={title}
          />
          <div
            className={`item mx-auto ${markdownDisplay ? "w-10/12" : "w-7/12"}`}
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

        {markdownDisplay && <div className="h-full w-full bg-[#cfcfcf]" />}

        {markdownDisplay && (
          <div className="mx-auto flex max-w-10/12 flex-col gap-3 pt-5">
            <div className="relative flex items-center justify-center">
              <h2 className="w-full text-center text-2xl font-bold text-white">
                マークダウン表示
              </h2>
            </div>
            <div
              className={`placeholder:タイトル decorat mx-auto my-3.5 inline-block px-2 text-center text-2xl font-bold text-[#cfcfcf] underline decoration-[#cfcfcf] decoration-2 underline-offset-5`}
            >
              {title || <span className="opacity-40">タイトル</span>}
            </div>
            <div className={"item bordered"}>
              <pre className="break-all whitespace-pre-wrap text-[#cfcfcf]">
                <code>{markdown}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
      <div className="fixed right-5 bottom-5">
        <MenuCard
          markdown={markdown}
          toggle={[markdownDisplay, setmarkdownDisplay]}
        />
      </div>
    </>
  );
}
