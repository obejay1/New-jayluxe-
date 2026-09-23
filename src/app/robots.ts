import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/account", "/cart", "/wishlist", "/admin", "/api/"],
    },
    sitemap: "https://jayluxestore.com/sitemap.xml",
  };
}