import React, { useEffect, useState, useCallback } from "react";

import { Box, Typography } from "@mui/material";
import { useComment } from "hooks/useComment";
import { CommentItem } from "./CommentItem";
import { CircularLoading } from "components/elements/loading/CircularLoading";
import { NoResult } from "components/elements/information/NoResult";
import { FormComment } from "./FormComment";

type Props = {
  idPost: string;
  
};
const CommentList: React.FC<Props> = ({ idPost }) => {
  const { comments, getCommentsByIdPost,addComment } = useComment();
  const [loading, setLoading] = useState<boolean>(true);

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

  const processList = () => {
    if (!comments) return null;
    if (!Array.isArray(comments)) return null;
    if (!comments.length) return <NoResult />;
    return comments.map((item, index) => (
      <Box mb={2} key={index}>
        <CommentItem item={item} />
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
        <FormComment id={idPost} onSubmit={addComment}/>
      </Box>
    </Box>
  );
};

export { CommentList };
