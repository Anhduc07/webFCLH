import { NextResponse } from "next/server";
import { readDatabase, readSiteData, writeDatabase } from "../../../../lib/store";

async function getType(context) {
  const params = await context.params;
  return decodeURIComponent(params.type);
}

export async function GET(_request, context) {
  const type = await getType(context);
  const data = await readDatabase();
  const kit = data.kits.find((item) => item.type === type);

  if (!kit) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y Ã¡o Ä‘áº¥u." }, { status: 404 });
  }

  return NextResponse.json(kit);
}

export async function PUT(request, context) {
  const type = await getType(context);
  const nextKit = await request.json();
  const data = await readDatabase();
  const index = data.kits.findIndex((item) => item.type === type);

  if (index === -1) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y Ã¡o Ä‘áº¥u." }, { status: 404 });
  }

  data.kits[index] = {
    ...nextKit,
    type: String(nextKit.type || type),
  };

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function PATCH(request, context) {
  const type = await getType(context);
  const updates = await request.json();
  const data = await readDatabase();
  const index = data.kits.findIndex((item) => item.type === type);

  if (index === -1) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y Ã¡o Ä‘áº¥u." }, { status: 404 });
  }

  data.kits[index] = {
    ...data.kits[index],
    ...updates,
    type: String(updates.type || data.kits[index].type),
  };

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function DELETE(_request, context) {
  const type = await getType(context);
  const data = await readDatabase();
  const originalLength = data.kits.length;
  data.kits = data.kits.filter((item) => item.type !== type);

  if (data.kits.length === originalLength) {
    return NextResponse.json({ error: "KhÃ´ng tÃ¬m tháº¥y Ã¡o Ä‘áº¥u." }, { status: 404 });
  }

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

