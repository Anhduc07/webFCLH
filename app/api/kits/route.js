import { NextResponse } from "next/server";
import { readDatabase, readSiteData, writeDatabase } from "../../../lib/store";

export async function GET() {
  const data = await readDatabase();
  return NextResponse.json(data.kits);
}

export async function POST(request) {
  const kit = await request.json();
  const data = await readDatabase();

  if (!kit.type || !kit.title) {
    return NextResponse.json({ error: "Ão Ä‘áº¥u cáº§n cÃ³ type vÃ  title." }, { status: 400 });
  }

  if (data.kits.some((item) => item.type === kit.type)) {
    return NextResponse.json({ error: "Type Ã¡o Ä‘áº¥u nÃ y Ä‘Ã£ tá»“n táº¡i." }, { status: 409 });
  }

  data.kits.push({
    image: "",
    ...kit,
  });

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() }, { status: 201 });
}

