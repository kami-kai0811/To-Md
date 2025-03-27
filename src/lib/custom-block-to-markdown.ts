// customMarkdownConverters.ts
import type { Block, PartialBlock } from "@blocknote/core";

export const customMarkdownConverters: Record<
  string,
  (block: Block | PartialBlock) => string
> = {};
