import { Metadata } from "next";
import ProfilePage from "./ProfilePage";
export const metadata: Metadata = {
  title: "My Profile",
};

async function ProfilePageContainer() {
  return <ProfilePage />;
}

export default ProfilePageContainer;
