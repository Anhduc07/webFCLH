import { NextResponse } from "next/server";
import { readDatabase, readSiteData, writeDatabase } from "../../../lib/store";

export async function GET() {
  const data = await readDatabase();
  return NextResponse.json(data.matches);
}

export async function POST(request) {
  const match = await request.json();
  const data = await readDatabase();

  if (!match.opponent || match.goals === undefined) {
    return NextResponse.json({ error: "Tráº­n Ä‘áº¥u cáº§n cÃ³ opponent vÃ  goals." }, { status: 400 });
  }

  const nextMatch = {
    id: match.id || `match-${Date.now()}`,
    score: "",
    scorers: "Äang cáº­p nháº­t",
    shots: 0,
    lineup: [],
    substitutes: [],
    absent: [],
    stats: {
      possession: "",
      shots: 0,
      shotsOnTarget: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    },
    notes: "",
    videoUrl: "",
    ...match,
    goals: Number(match.goals),
  };

  data.matches.unshift(nextMatch);
  data.home.latestMatch = nextMatch.score || data.home.latestMatch;
  data.home.goals = data.matches.reduce((sum, item) => sum + Number(item.goals || 0), 0);

  await writeDatabase(data);
  return NextResponse.json({ ok: true, data: await readSiteData() }, { status: 201 });
}

