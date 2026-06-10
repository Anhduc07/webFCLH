import { NextResponse } from "next/server";
import { readDatabase, readSiteData, writeDatabase } from "../../../../lib/store";

async function getId(context) {
  const params = await context.params;
  return decodeURIComponent(params.id);
}

function recalculateHome(data) {
  data.home.goals = data.matches.reduce((sum, item) => sum + Number(item.goals || 0), 0);
  data.home.latestMatch = data.matches[0]?.score || data.home.latestMatch;
}

export async function GET(_request, context) {
  const id = await getId(context);
  const data = await readDatabase();
  const match = data.matches.find((item) => item.id === id);

  if (!match) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y tráº­n Ä‘áº¥u." }, { status: 404 });
  }

  return NextResponse.json(match);
}

export async function PUT(request, context) {
  const id = await getId(context);
  const nextMatch = await request.json();
  const data = await readDatabase();
  const index = data.matches.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y tráº­n Ä‘áº¥u." }, { status: 404 });
  }

  data.matches[index] = {
    ...nextMatch,
    id: String(nextMatch.id || id),
  };
  recalculateHome(data);

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function PATCH(request, context) {
  const id = await getId(context);
  const updates = await request.json();
  const data = await readDatabase();
  const index = data.matches.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y tráº­n Ä‘áº¥u." }, { status: 404 });
  }

  data.matches[index] = {
    ...data.matches[index],
    ...updates,
    id: String(updates.id || data.matches[index].id),
  };
  recalculateHome(data);

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function DELETE(_request, context) {
  const id = await getId(context);
  const data = await readDatabase();
  const originalLength = data.matches.length;
  data.matches = data.matches.filter((item) => item.id !== id);

  if (data.matches.length === originalLength) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y tráº­n Ä‘áº¥u." }, { status: 404 });
  }

  recalculateHome(data);
  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

