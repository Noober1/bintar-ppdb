import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ppdb.binataruna.sch.id/about",
      lastModified: new Date(),
    },
    {
      url: "https://ppdb.binataruna.sch.id/login",
      lastModified: new Date(),
    },
  ];
}
