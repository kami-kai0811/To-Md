import { blocksToMarkdown } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

import { EmbedBlockContent } from "./embed-block-content";

export const EmbedBlock = createReactBlockSpec(
  {
    type: "embed",
    content: "none",
    propSchema: { url: { default: "" } },
  },
  {
    render: () => <EmbedBlockContent />,
  },
);
