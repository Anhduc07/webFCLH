import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function MatchesPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="matches" initialData={data} />;
}
