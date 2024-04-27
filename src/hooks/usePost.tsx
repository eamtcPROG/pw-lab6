import { useContext } from "react";
import { Context } from "contexts/post.context";
import { PostDto } from "dto/post.dto";

type UsePost = {
  posts: Array<PostDto> | null;
  addPost: (post: PostDto) => void;
  getPostsLocal: () => void;
};
export const usePost = (): UsePost => {
  const {
    state: { posts },
    actions: { addPost, getPostsLocal },
  } = useContext(Context);

  return { posts, addPost, getPostsLocal };
};
