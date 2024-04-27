import { PostDto } from "dto/post.dto";
import createDataContext from "hoc/createDataContext";
import { LocalStorageTools } from "tools/localstorage.tools";

type StateResource = {
  posts: Array<PostDto> | null;
};

type Actions = {
    addPost: (post: PostDto) => void;
    getPostsLocal: () => void;
};

const resourceReducer = (state: StateResource, action: any) => {
  switch (action.type) {
    case "add_post": {
      const currentPosts = state.posts || [];
      const newArr = [...currentPosts, action.payload];
      LocalStorageTools.saveObject("posts", newArr);
      return {
        ...state,
        posts: newArr,
      };
    }
    case "get_posts_local": {
      let posts = LocalStorageTools.getObject("posts");
      if(!posts) posts = [];
      return {
        ...state,
        posts: posts,
      };
    }

    default:
      return state;
  }
};

const addPost = (dispatch: any) => (post: PostDto) => {
  dispatch({ type: "add_post", payload: post });
};

const getPostsLocal = (dispatch: any) => () => {
  dispatch({ type: "get_posts_local" });
};

export const { Provider, Context } = createDataContext<StateResource, Actions>(
  resourceReducer,
  {
    addPost,
    getPostsLocal,
  },
  {
    posts: null,
  }
);
