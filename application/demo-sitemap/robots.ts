import { getLocationSSR } from "@/services/server-side/services-api/service-api";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const res = await getLocationSSR();
  let list_sitemap: string[] = ["/sitemap.xml"];

  if (res.data.code > 0 && res.data.data && res.data.data.list) {
    res.data.data.list.map((city) => {
      list_sitemap.push(
        `/demo-page/sitemap/${city.LocationID}.xml`
      );
    });
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: list_sitemap,
  };
}
