import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function CommunityPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="community" initialData={data} />;
}
