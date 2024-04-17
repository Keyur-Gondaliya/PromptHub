import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export async function generateMetadata({
  params: { user },
}: any): Promise<Metadata> {
  const response = await fetch(`http://localhost:3000/api/users/${user}/posts`);
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
