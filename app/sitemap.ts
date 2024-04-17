import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt`);
  const data = await response.json();
  const userList: MetadataRoute.Sitemap = data
    .map(({ creator: { _id } }: { creator: { _id: string } }) => ({
      url: `${process.env.NEXTAUTH_URL}/api/users/${_id}/posts`,
    }))
    .filter(
      (v: { url: string }, i: number, a: []) =>
        a.findIndex((v2: { url: string }) => v2.url === v.url) === i
    );
  return userList;
}
