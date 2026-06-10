import ClubSite from "./club-site";
import { readSiteData } from "../lib/store";

export default async function Page() {
  const data = await readSiteData();
  return <ClubSite initialData={data} />;
}
