import { EmbedBlock } from "@/components/embed-link-block/embedded-link";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    embed: EmbedBlock,
  },
});
