import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function KitsPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="kits" initialData={data} />;
}
