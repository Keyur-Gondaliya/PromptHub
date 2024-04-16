"use client";

import Image from "next/image";
import { Post } from "./Feed";
import { useState } from "react";

type Props = {
  post: Post;
  handleTagClick: (tag: string) => void;
  handleEdit: (tag: string) => void;
  handleDelete: (tag: string) => void;
};

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: Props) {
  const [copied, setcopied] = useState<string>("");
  const handleCopy = () => {
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setcopied("");
    }, 1500);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            height={12}
            width={12}
            alt="copied"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
    </div>
  );
}

export default PromptCard;
