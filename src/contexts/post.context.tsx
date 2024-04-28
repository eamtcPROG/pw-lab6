import { PostDto } from "dto/post.dto";
import createDataContext from "hoc/createDataContext";
import { LocalStorageTools } from "tools/localstorage.tools";

type StateResource = {
  posts: Array<PostDto> | null;
  searchText: string;
};

type Actions = {
    addPost: (post: PostDto) => void;
    getPostsLocal: () => void;
    setSearchText: (searchText: string) => void;
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
    case "set_search_text": {
      return {
        ...state,
        searchText: action.payload,
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

const setSearchText = (dispatch: any) => (searchText: string) => {
  dispatch({ type: "set_search_text", payload: searchText });
}

export const { Provider, Context } = createDataContext<StateResource, Actions>(
  resourceReducer,
  {
    addPost,
    getPostsLocal,
    setSearchText
  },
  {
    posts: null,
    searchText: "",
  }
);
