import ClubSite from "../club-site";
import { readSiteData } from "../../lib/store";

export default async function AdminPage() {
  const data = await readSiteData();
  return <ClubSite initialSection="admin" initialData={data} />;
}
