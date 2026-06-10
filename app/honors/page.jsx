import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function HonorsPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="honors" initialData={data} />;
}
