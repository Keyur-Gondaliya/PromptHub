"use client";

import { Post } from "@components/Feed";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

function ProfilePage({}: Props) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
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
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcom to your personalized profile Page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
