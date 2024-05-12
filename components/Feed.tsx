"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Spinner from "./Spinner";
export interface Post {
  prompt: string;
  tag: string;
  creator: {
    username: string;
    image: string;
    email: string;
    _id: string;
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
        />
      ))}
    </div>
  );
};
type Props = {};

function Feed({}: Props) {
  const [searchText, setSearchText] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      setIsLoaded(false);
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    if (searchText && searchText.length > 0) {
      const getData = setTimeout(async () => {
        try {
          setIsLoaded(false);

          const response = await fetch(`/api/search/${searchText}`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoaded(true);
        }
      }, 500);

      return () => clearTimeout(getData);
    } else fetchPosts();
  }, [searchText]);
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
      {isLoaded ? (
        <PromptCardList
          data={posts}
          handleTagClick={(tag) => setSearchText(tag)}
        />
      ) : (
        <div role="status" className="mt-20">
          <Spinner />
        </div>
      )}
    </section>
  );
}

export default Feed;
