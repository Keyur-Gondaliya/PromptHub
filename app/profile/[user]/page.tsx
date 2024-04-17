import { Metadata } from "next";
import ProfilePage from "./ProfilePage";
// generatestaticparams (only when needed)
// export function generateStaticParams() {
//   return [{ user: "661ea8626e3fc7716bc19e52" }];
// }

export async function generateMetadata({
  params: { user },
}: any): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${user}/posts`
  );
  const data = await response.json();

  return {
    title: data[0].creator.username,
    description: data[0].tag + " " + data[0].prompt,
    openGraph: { images: [{ url: data[0].creator.image }] },
  };
}

function ProfilePageContainer({ params: { user } }: any) {
  return <ProfilePage />;
}

export default ProfilePageContainer;
