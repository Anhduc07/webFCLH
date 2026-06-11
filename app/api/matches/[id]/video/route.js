import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = new Set(["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"]);
const maxSize = 100 * 1024 * 1024;

function safePart(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "video";
}

export async function POST(request, context) {
  const { id } = await context.params;
  const form = await request.formData();
  const file = form.get("video");

  if (!file || !file.size) {
    return NextResponse.json({ error: "Chưa chọn video để upload." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "Video chỉ hỗ trợ mp4, webm, mov hoặc m4v." }, { status: 400 });
  }

  if (file.size > maxSize) {
    return NextResponse.json({ error: "Video tối đa 100MB." }, { status: 400 });
  }

  const extension = path.extname(file.name) || ".mp4";
  const filename = `${safePart(id)}-${Date.now()}${safePart(extension)}`;
  const videosDir = path.join(process.cwd(), "public", "videos");
  const filepath = path.join(videosDir, filename);

  await fs.mkdir(videosDir, { recursive: true });
  await fs.writeFile(filepath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ ok: true, url: `/videos/${filename}` }, { status: 201 });
}
