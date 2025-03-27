import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { load } from "cheerio";

export async function POST(req: NextRequest) {
  const { url } = (await req.json()) as { url: string };
  if (!url) {
    return NextResponse.json({ error: "URL not found." }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Could not access URL. Status: ${response.status}` },
        { status: response.status },
      );
    }

    const html: string = await response.text();
    const $ = load(html);
    const title = $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") ??
      $('meta[name="description"]').attr("content") ??
      "";
    const image = $('meta[property="og:image"]').attr("content") ?? "";
    const meta = {
      title,
      description,
      image: image ? { url: image } : {},
    };
    return NextResponse.json({ link: url, meta });
  } catch (err: unknown) {
    console.error(err);
    let message = "Internal Server Error";
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
