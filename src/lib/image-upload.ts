//画像アップロード機能
export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: body,
  });

  const json = (await res.json()) as { url: string; error?: string };

  if (!res.ok) {
    throw new Error(json.error ?? "アップロード失敗");
  }
  return json.url;
}
