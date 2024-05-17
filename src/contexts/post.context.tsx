import RequestListDTO from "dto/app/requestlist.dto";
import ResultListDTO from "dto/app/resultlist.dto";
import ResultObjectDTO from "dto/app/resultobject.dto";
import { PostDto } from "dto/post.dto";
import createDataContext from "hoc/createDataContext";
import PostService from "services/post.service";
import { LocalStorageTools } from "tools/localstorage.tools";

type StateResource = {
  posts: Array<PostDto> | null;
  searchText: string;
  totalPages:number;
};

type Actions = {
  addPost: (post: PostDto) => void;
  getPostsLocal: (page?: number,setTotalPages?:(v:number)=>void) => void;
  setSearchText: (searchText: string) => void;
  deletePost: (id: string) => void;
  editPost: (post: PostDto) => void;
};
const service = new PostService();
const resourceReducer = (state: StateResource, action: any) => {
  switch (action.type) {
    case "add_post": {
      const currentPosts = state.posts || [];
      const newArr = [...currentPosts, action.payload.obj];

      return {
        ...state,
        posts: newArr,
        totalPages: action.payload.totalPages
      };
    }
    case "get_posts_local": {
      return {
        ...state,
        posts: action.payload.objects,
        totalPages: action.payload.totalPages

      };
    }
    case "set_search_text": {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case "delete_post": {
      const currentPosts = state.posts || [];
      const newArr = currentPosts.filter((item) => item.id !== action.payload);

      return {
        ...state,
        posts: newArr,
      };
    }
    case "edit_post": {
      const currentPosts = state.posts || [];
      const newArr = currentPosts.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });

      return {
        ...state,
        posts: newArr,
      };
    }

    default:
      return state;
  }
};

const addPost = (dispatch: any) => (post: PostDto) => {
  service.add(handleAdd, { dispatch }, post);
};
const handleAdd = (result: any, params: any) => {
  if (!params) return;
  if (!params.dispatch) return;
  if (!result) return;
  if (result.err) return;
  if (!result.obj) return;
  params.dispatch({ type: "add_post", payload: {obj:result.obj.obj ,totalPages:result.obj.totalpages || 0} });
};
const getPostsLocal = (dispatch: any) => (page?: number,setTotalPages?:(v:number)=>void) => {
  const req = new RequestListDTO();
  if (!page) page = 1;
  req.page = page;
  req.onpage = 10;
  service.getList(handleGetPostsLocal, { dispatch,setTotalPages }, req);
};

const handleGetPostsLocal = (result: ResultListDTO, params: any) => {
  if (!params) return;
  if (!params.dispatch) return;
  if (!result) return;
  if (result.err) return;
  const objects = result.objects || [];
  // if (params.setTotalPages) {
  //   params.setTotalPages(result.totalpages || 1);
  // }
  params.dispatch({ type: "get_posts_local", payload: {objects, totalPages:result.totalpages || 0} });
};
const setSearchText = (dispatch: any) => (searchText: string) => {
  dispatch({ type: "set_search_text", payload: searchText });
};

const deletePost = (dispatch: any) => (id: string) => {
  service.delete(id, handleDelete, { dispatch, id });
};

const handleDelete = (result: ResultObjectDTO, params: any) => {
  if (!params) return;
  if (!params.dispatch) return;
  if (!params.id) return;
  if (!result) return;
  if (result.err) return;
  params.dispatch({ type: "delete_post", payload: params.id });
};

const editPost = (dispatch: any) => (post: PostDto) => {
  if (!post.id) return;
  service.update(post.id, handleEdit, { dispatch }, post);
};

const handleEdit = (result: ResultObjectDTO, params: any) => {
  if (!params) return;
  if (!params.dispatch) return;
  if (!result) return;
  if (result.err) return;
  if (!result.obj) return;
  params.dispatch({ type: "edit_post", payload: result.obj });
};

export const { Provider, Context } = createDataContext<StateResource, Actions>(
  resourceReducer,
  {
    addPost,
    getPostsLocal,
    setSearchText,
    deletePost,
    editPost,
  },
  {
    posts: null,
    searchText: "",
    totalPages:0
  }
);
