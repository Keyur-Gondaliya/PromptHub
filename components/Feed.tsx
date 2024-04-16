"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
export interface Post {
  prompt: string;
  tag: string;
  creator: {
    username: string;
    image: string;
    email: string;
  };
  _id: string;
}
interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
}
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};
type Props = {};

function Feed({}: Props) {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flec-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
