import type { schema } from "@/config/block-schema";
import { Link } from "lucide-react";

export function insertEmbed(editor: typeof schema.BlockNoteEditor) {
  return {
    title: "URL埋め込み",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "embed",
            props: { url: "" },
          },
        ],
        editor.getTextCursorPosition().block,
        "after",
      );
    },
    group: "Media",
    icon: <Link width={20} height={20} />,
    hint: "URLを埋め込む",
    aliases: ["embed", "url"],
  };
}
