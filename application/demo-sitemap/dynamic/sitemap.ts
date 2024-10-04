import { getLocationSSR } from "@/services/server-side/services-api/service-api";
import { CityShort } from "@/types/apiTypes";
import { MetadataRoute } from "next"

const BASE_URL = process.env.BASE_WEB || ""
 
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return []
}
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getLocationSSR();
  let list_demo: CityShort[] = [];

  if (res.data.code > 0 && res.data.data && res.data.data.list) {
    list_demo = res.data.data.list
  }
  return list_demo.map((demo) => ({
    url: `${BASE_URL}/demo-mage/${demo.LocationID}`,
    lastModified: new Date(),
  }))
}