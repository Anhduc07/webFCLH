import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function PlayersPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="players" initialData={data} />;
}
