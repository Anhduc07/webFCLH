import ClubSite from "../../club-site";
import { readSiteData } from "../../../lib/store";

export default async function MatchDetailPage({ params }) {
  const data = await readSiteData();
  const { id } = await params;
  return <ClubSite initialSection="match-detail" initialMatchId={decodeURIComponent(id)} initialData={data} />;
}
