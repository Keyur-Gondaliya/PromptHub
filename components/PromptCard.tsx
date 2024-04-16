"use client";

import Image from "next/image";
import { Post } from "./Feed";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: Props) {
  const pathName = usePathname();
  const { data: session } = useSession();
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
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
