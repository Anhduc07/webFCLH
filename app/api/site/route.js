import { NextResponse } from "next/server";
import { readSiteData, writeSiteData } from "../../../lib/store";

export async function GET() {
  const data = await readSiteData();
  return NextResponse.json(data);
}

export async function PUT(request) {
  const data = await request.json();
  await writeSiteData(data);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function PATCH(request) {
  const updates = await request.json();
  const data = await readSiteData();
  const nextData = {
    ...data,
    ...updates,
  };

  await writeSiteData(nextData);
  return NextResponse.json({ ok: true, data: await readSiteData() });
}

export async function POST(request) {
  const body = await request.json();
  const data = await readSiteData();

  if (body.type === "match") {
    const homeGoals = Number(body.homeGoals);
    const awayGoals = Number(body.awayGoals);
    const shots = Number(body.shots);

    if (!body.opponent || Number.isNaN(homeGoals) || Number.isNaN(awayGoals) || Number.isNaN(shots)) {
      return NextResponse.json({ error: "Dá»¯ liá»‡u tráº­n Ä‘áº¥u chÆ°a há»£p lá»‡." }, { status: 400 });
    }

    const opponent = String(body.opponent).trim();
    const match = {
      id: `match-${Date.now()}`,
      opponent,
      score: `FCLH ${homeGoals}-${awayGoals} ${opponent}`,
      scorers: String(body.scorers || "Äang cáº­p nháº­t").trim(),
      shots,
      goals: homeGoals,
    };

    data.matches = [match, ...data.matches].slice(0, 8);
    data.home.latestMatch = match.score;
    data.home.goals = data.matches.reduce((sum, item) => sum + Number(item.goals || 0), 0);

    await writeSiteData(data);
    return NextResponse.json({ ok: true, data: await readSiteData() }, { status: 201 });
  }

  return NextResponse.json({ error: "Loáº¡i dá»¯ liá»‡u chÆ°a Ä‘Æ°á»£c há»— trá»£." }, { status: 400 });
}

