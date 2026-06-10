import { NextResponse } from "next/server";
import { readDatabase, readSiteData, writeDatabase } from "../../../lib/store";

export async function GET() {
  const data = await readDatabase();
  return NextResponse.json(data.players);
}

export async function POST(request) {
  const player = await request.json();
  const data = await readDatabase();

  if (!player.number || !player.name) {
    return NextResponse.json({ error: "Cáº§u thá»§ cáº§n cÃ³ number vÃ  name." }, { status: 400 });
  }

  if (data.players.some((item) => item.number === player.number)) {
    return NextResponse.json({ error: "Sá»‘ Ã¡o nÃ y Ä‘Ã£ tá»“n táº¡i." }, { status: 409 });
  }

  data.players.push({
    avatar: "",
    position: "",
    ...player,
    number: String(player.number),
  });

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() }, { status: 201 });
}

