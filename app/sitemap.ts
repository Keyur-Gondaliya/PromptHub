import { MetadataRoute } from "next";
interface Prop {
  creator: { _id: string; updatedAt: string };
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/prompt`);
  const data = await response.json();
  if (!data) return [];
  const userList: MetadataRoute.Sitemap = data
    .map(({ creator: { _id, updatedAt } }: Prop) => ({
      url: `${process.env.NEXTAUTH_URL}/profile/${_id}`,
      lastModified: updatedAt,
    }))
    .filter(
      (v: { url: string }, i: number, a: []) =>
        a.findIndex((v2: { url: string }) => v2.url === v.url) === i
    );
  return userList;
}
