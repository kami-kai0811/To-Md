import type { LinkCardProps } from "@/types/link-cart-props";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export function LinkCard({
  meta,
  link,
}: {
  meta: LinkCardProps;
  link: string;
}) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex w-full items-center gap-3 rounded border p-4 shadow">
        {meta.image?.url && (
          <div className="mb-2">
            <Image
              unoptimized
              src={meta.image.url}
              alt={meta.title}
              width={50}
              height={50}
              className="h-auto w-full rounded object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h2 className="mb-1 text-center text-xl font-bold">{meta.title}</h2>
          {/* <p className="text-sm text-gray-600">{meta.description}</p> */}
        </div>
      </div>
    </Link>
  );
}
