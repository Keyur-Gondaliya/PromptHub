import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  //Dynamic Create
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/api/*", "/update-prompt", "create-prompt"],
        allow: "/",
      },
    ],
    sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
  };
}
