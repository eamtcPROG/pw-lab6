import { useState } from "react";

import { CommentDto } from "dto/comment.dto";
import { LocalStorageTools } from "tools/localstorage.tools";

type UseComment = {
  comments: Array<CommentDto> | null;
  addComment: (comment: CommentDto, cb?: () => void) => void;
  getCommentsByIdPost: (id: string) => void;
  deleteComment: (id: string) => void;
};
export const useComment = (): UseComment => {
  const [comments, setComments] = useState<Array<CommentDto> | null>(null);

  const addComment = (comment: CommentDto, cb?: () => void) => {
    let currentComments = LocalStorageTools.getObject("comments");
    if (!currentComments) currentComments = [];
    const newArr = [...currentComments, comment];
    LocalStorageTools.saveObject("comments", newArr);
    const comments = CommentDto.filterByIdPost(newArr, comment.idpost);
    setComments(comments);
    if (cb) {
      setTimeout(() => {
        cb();
      }, 500);
    }
  };

  const getCommentsByIdPost = (id: string) => {
    let comments = LocalStorageTools.getObject("comments");
    if (!comments) comments = [];
    comments = CommentDto.filterByIdPost(comments, id);
    setComments(comments);
  };

  const deleteComment = (id: string) => {
    let currentComments: Array<CommentDto> =
      LocalStorageTools.getObject("comments");
    if (!currentComments) currentComments = [];
    const objectToDelete = currentComments.find((item) => item.id === id);
    if(!objectToDelete) return;
    const newArr = currentComments.filter((item) => item.id !== id);
    LocalStorageTools.saveObject("comments", newArr);
    const comments = CommentDto.filterByIdPost(newArr, objectToDelete.idpost);
    setComments(comments);
  };

  return { comments, addComment, getCommentsByIdPost, deleteComment };
};
