import { NextResponse } from "next/server";
import { readDatabase, readSiteData, writeDatabase } from "../../../../lib/store";

async function getNumber(context) {
  const params = await context.params;
  return decodeURIComponent(params.number);
}

export async function GET(_request, context) {
  const number = await getNumber(context);
  const data = await readDatabase();
  const player = data.players.find((item) => item.number === number);

  if (!player) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y cáº§u thá»§." }, { status: 404 });
  }

  return NextResponse.json(player);
}

export async function PUT(request, context) {
  const number = await getNumber(context);
  const nextPlayer = await request.json();
  const data = await readDatabase();
  const index = data.players.findIndex((item) => item.number === number);

  if (index === -1) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y cáº§u thá»§." }, { status: 404 });
  }

  data.players[index] = {
    ...nextPlayer,
    number: String(nextPlayer.number || number),
  };

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function PATCH(request, context) {
  const number = await getNumber(context);
  const updates = await request.json();
  const data = await readDatabase();
  const index = data.players.findIndex((item) => item.number === number);

  if (index === -1) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y cáº§u thá»§." }, { status: 404 });
  }

  data.players[index] = {
    ...data.players[index],
    ...updates,
    number: String(updates.number || data.players[index].number),
  };

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function DELETE(_request, context) {
  const number = await getNumber(context);
  const data = await readDatabase();
  const originalLength = data.players.length;
  data.players = data.players.filter((item) => item.number !== number);

  if (data.players.length === originalLength) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y cáº§u thá»§." }, { status: 404 });
  }

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

