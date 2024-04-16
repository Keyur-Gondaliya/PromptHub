"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};
interface Post {
  prompt: string;
  tag: string;
}
function page({}: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const Router = useRouter();

  const createPrompt = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default page;
