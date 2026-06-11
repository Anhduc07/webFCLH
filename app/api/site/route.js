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
      return NextResponse.json({ error: "Dữ liệu trận đấu chưa hợp lệ." }, { status: 400 });
    }

    const opponent = String(body.opponent).trim();
    const match = {
      id: `match-${Date.now()}`,
      opponent,
      date: new Date().toISOString().slice(0, 10),
      competition: "Friendly",
      venue: "Kim Thanh Arena",
      score: `FC LH ${homeGoals}-${awayGoals} ${opponent}`,
      scorers: String(body.scorers || "Đang cập nhật").trim(),
      shots,
      goals: homeGoals,
      status: "FT",
      lineup: [],
      substitutes: [],
      absent: [],
      stats: {
        possession: "",
        shots,
        shotsOnTarget: 0,
        corners: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
      },
      notes: "",
      videoUrl: "",
    };

    data.matches = [match, ...data.matches].slice(0, 8);
    data.home.latestMatch = match.score;
    data.home.goals = data.matches.reduce((sum, item) => sum + Number(item.goals || 0), 0);

    await writeSiteData(data);
    return NextResponse.json({ ok: true, data: await readSiteData() }, { status: 201 });
  }

  return NextResponse.json({ error: "Loại dữ liệu chưa được hỗ trợ." }, { status: 400 });
}

