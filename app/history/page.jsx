import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function HistoryPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="history" initialData={data} />;
}
