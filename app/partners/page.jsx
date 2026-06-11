import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function PartnersPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="partners" initialData={data} />;
}
