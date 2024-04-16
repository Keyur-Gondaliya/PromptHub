"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data);
    };
    if (session && promptId) fetchPost();
  }, [session, promptId]);

  const editPrompt = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt Id Not Found!");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
}

export default page;
