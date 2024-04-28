import { useContext, useCallback } from "react";
import { Context } from "contexts/post.context";
import { PostDto } from "dto/post.dto";

type UsePost = {
  posts: Array<PostDto> | null;
  addPost: (post: PostDto) => void;
  getPostsLocal: () => void;
  filterPosts: () => Array<PostDto>;
  setSearchText: (searchText: string) => void;
  searchText: string;
};
export const usePost = (): UsePost => {
  const {
    state: { posts, searchText },
    actions: { addPost, getPostsLocal, setSearchText },
  } = useContext(Context);

  const filterPosts = useCallback(() => {
    if (!posts) return [];
    if (!searchText) return posts;
    return PostDto.filter(posts, searchText);
  }, [posts, searchText]);

  return {
    posts,
    addPost,
    getPostsLocal,
    filterPosts,
    setSearchText,
    searchText,
  };
};
