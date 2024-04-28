import { useState } from "react";

import { CommentDto } from "dto/comment.dto";
import { LocalStorageTools } from "tools/localstorage.tools";

type UseComment = {
  comments: Array<CommentDto> | null;
  addComment: (comment: CommentDto) => void;
  getCommentsByIdPost: (id: string) => void;
};
export const useComment = (): UseComment => {
  const [comments, setComments] = useState<Array<CommentDto> | null>(null);
  const addComment = (comment: CommentDto) => {
    let currentComments =  LocalStorageTools.getObject("comments");
    if (!currentComments) currentComments = [];
    const newArr = [...currentComments, comment];
    LocalStorageTools.saveObject("comments", newArr);
    const comments = CommentDto.filterByIdPost(newArr, comment.idpost);
    setComments(comments);
  };
  
  const getCommentsByIdPost = (id: string) => {
    let comments = LocalStorageTools.getObject("comments");
    if (!comments) comments = [];
    comments = CommentDto.filterByIdPost(comments, id);
    setComments(comments);
  };

  
  return { comments, addComment, getCommentsByIdPost };
};
