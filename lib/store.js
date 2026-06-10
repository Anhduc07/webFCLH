import { promises as fs } from "fs";
import path from "path";
import { siteContent } from "../backend/content";

const databasePath = path.join(process.cwd(), "data", "database.json");

function clone(data) {
  return {
    ...structuredClone(data),
    content: structuredClone(siteContent),
  };
}

function withoutRuntimeContent(data) {
  const { content: _content, ...database } = data;
  return database;
}

export async function readDatabase() {
  const raw = await fs.readFile(databasePath, "utf8");
  return JSON.parse(raw);
}

export async function writeDatabase(data) {
  await fs.writeFile(databasePath, `${JSON.stringify(withoutRuntimeContent(data), null, 2)}\n`, "utf8");
}

export async function readSiteData() {
  return clone(await readDatabase());
}

export async function writeSiteData(data) {
  await writeDatabase(data);
}
