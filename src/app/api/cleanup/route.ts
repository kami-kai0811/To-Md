import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

export async function POST() {
  try {
    const { data: files, error } = await supabase.storage
      .from("to-md")
      .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;

    const now = Date.now();
    //12時間
    const oneDay = 12 * 60 * 60 * 1000;
    for (const file of files) {
      const parts = file.name.split("-");
      const timestamp = Number(parts[0]);
      if (!isNaN(timestamp) && now - timestamp > oneDay) {
        const { error: delError } = await supabase.storage
          .from("to-md")
          .remove([file.name]);
        if (delError) {
          console.error(`ファイル ${file.name} の削除エラー:`, delError);
        }
      }
    }
    return NextResponse.json({ message: "Cleanup executed" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  return await POST();
}
