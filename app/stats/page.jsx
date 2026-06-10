import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function StatsPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="stats" initialData={data} />;
}
