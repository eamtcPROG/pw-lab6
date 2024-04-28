import React, { useEffect, useState, useCallback } from "react";

import { Box, Skeleton, Typography } from "@mui/material";
import { useComment } from "hooks/useComment";
import { CommentItem } from "./CommentItem";
import { CircularLoading } from "components/elements/loading/CircularLoading";
import { NoResult } from "components/elements/information/NoResult";
import { FormComment } from "./FormComment";
import { CommentDto } from "dto/comment.dto";

type Props = {
  idPost: string;
};
const CommentList: React.FC<Props> = ({ idPost }) => {
  const { comments, getCommentsByIdPost, addComment, deleteComment } =
    useComment();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const checkLoading = useCallback(() => {
    let loading = false;
    if (!comments) loading = true;
    if (!Array.isArray(comments)) loading = true;
    setLoading(loading);
  }, [comments]);

  useEffect(() => {
    getCommentsByIdPost(idPost);
  }, [idPost]);

  useEffect(() => {
    checkLoading();
  }, [checkLoading]);

  const handleCbDelete = () => {
    setLoadingForm(false);
  };
  const handleAdd = (obj: CommentDto) => {
    setLoadingForm(true);
    addComment(obj, handleCbDelete);
  };

  const processList = () => {
    if (!comments) return null;
    if (!Array.isArray(comments)) return null;
    if (!comments.length) return <NoResult />;
    return comments.map((item, index) => (
      <Box mb={2} key={index}>
        <CommentItem item={item} deleteFun={deleteComment} />
      </Box>
    ));
  };

  return loading ? (
    <CircularLoading />
  ) : (
    <Box>
      <Box>{processList()}</Box>
      <Box>
        <Typography>Write a comment</Typography>
        {loadingForm ? (
          <Skeleton variant="rectangular" height={50} sx={{ width: "100%" }} />
        ) : (
          <FormComment id={idPost} onSubmit={handleAdd} />
        )}
      </Box>
    </Box>
  );
};

export { CommentList };
