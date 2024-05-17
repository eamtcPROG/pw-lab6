import { useState } from "react";

import { CommentDto } from "dto/comment.dto";
import { LocalStorageTools } from "tools/localstorage.tools";
import ResultObjectDTO from "dto/app/resultobject.dto";
import CommentService from "services/comment.service";
import { CommonTools } from "tools/commontools";

type UseComment = {
  comments: Array<CommentDto> | null;
  addComment: (comment: CommentDto, cb?: () => void) => void;
  getCommentsByIdPost: (id: string) => void;
  deleteComment: (id: string) => void;
};

const service = new CommentService();
export const useComment = (): UseComment => {
  const [comments, setComments] = useState<Array<CommentDto> | null>(null);

  const addComment = (comment: CommentDto, cb?: () => void) => {
    service.add(handleAdd, { cb }, comment);
  };

  const handleAdd = (result: ResultObjectDTO, params: any) => {
    if (!result) return;
    if (result.err) return;
    if (!result.obj) return;
    const newComments: Array<CommentDto> = [
      ...(comments || []),
      result.obj as CommentDto,
    ];
    setComments(newComments);
    if (params && params.cb) params.cb();
  };
  const getCommentsByIdPost = (id: string) => {
    service.getByPost(id, handleGet, {});
  };
  const handleGet = (result: ResultObjectDTO, params: any) => {
    if (!result) return;
    if (result.err) return;
    if (!result.obj) return;
    const comments = result.obj as Array<CommentDto>;
    setComments(comments);
  };

  const deleteComment = (id: string) => {
    service.delete(id, handleDelete, { id });
  };

  const handleDelete = (result: ResultObjectDTO, params: any) => {
    if (!result) return;
    if (result.err) return;
    if (!params) return;
    if (!params.id) return;

    const newComments = (comments || []).filter(
      (item) => item.id !== params.id
    );
    setComments(newComments);
  };

  return { comments, addComment, getCommentsByIdPost, deleteComment };
};
