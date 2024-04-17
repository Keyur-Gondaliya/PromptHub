"use client";

import { Post } from "@components/Feed";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

function ProfilePage({}: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  let userId = usePathname();
  userId = userId.slice(9);
  //   if (userId === session?.user.id) router.push(`/profile`);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete this prompt?`
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
        setPosts(posts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <Profile
      name={userId === session?.user.id ? "My" : "User"}
      desc={
        userId === session?.user.id
          ? "Welcom to your personalized profile Page"
          : ""
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
