import { useContext, useCallback } from "react";
import { Context } from "contexts/post.context";
import { PostDto } from "dto/post.dto";

type UsePost = {
  posts: Array<PostDto> | null;
  addPost: (post: PostDto) => void;
  getPostsLocal: (page?: number,setTotalPages?:(v:number)=>void) => void;
  filterPosts: () => Array<PostDto>;
  setSearchText: (searchText: string) => void;
  searchText: string;
  deletePost: (id: string) => void;
  editPost: (post: PostDto) => void;
  totalPages:number;
};
export const usePost = (): UsePost => {
  const {
    state: { posts, searchText,totalPages },
    actions: { addPost, getPostsLocal, setSearchText,deletePost,editPost },
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
    deletePost,
    editPost,
    totalPages
  };
};
