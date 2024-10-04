import { MetadataRoute } from "next";

// sử dụng cho static routing
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://au.vtc.vn",
      lastModified: new Date(),
    },
    {
      url: "https://au.vtc.vn/taigame",
      lastModified: new Date(),
    },
    {
      url: "https://au.vtc.vn/su-kien-au/au-mall",
      lastModified: new Date(),
    },
  ];
}
