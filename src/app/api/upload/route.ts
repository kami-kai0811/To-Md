import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  function sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  }
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const safeFileName = sanitizeFilename(file.name);
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const filePath = `${Date.now()}-${safeFileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from("to-md")
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  console.log("error", error);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: signedUrlData, error: signedError } = await supabase.storage
    .from("to-md")
    .createSignedUrl(filePath, 60 * 60);

  if (signedError) {
    return NextResponse.json({ error: signedError.message }, { status: 500 });
  }

  return NextResponse.json({ url: signedUrlData.signedUrl });
}
