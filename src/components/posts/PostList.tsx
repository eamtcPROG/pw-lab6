import React, { useEffect, useState, useCallback } from "react";

import { Grid } from "@mui/material";
import { usePost } from "hooks/usePost";
import { PostItem } from "./PostItem";
import { CircularLoading } from "components/elements/loading/CircularLoading";
import { NoResult } from "components/elements/information/NoResult";

const PostList: React.FC = () => {
  const { posts, getPostsLocal } = usePost();
  const [loading, setLoading] = useState<boolean>(true);

  const checkLoading = useCallback(() => {
    let loading = false;
    if (!posts) loading = true;
    if (!Array.isArray(posts)) loading = true;
    setLoading(loading);
  }, [posts]);

  useEffect(() => {
    getPostsLocal();
  }, []);

  useEffect(() => {
    checkLoading();
  }, [checkLoading]);

  const processList = () => {
    if (!posts) return null;
    if (!Array.isArray(posts)) return null;
    if (!posts.length) return <NoResult />;
    return posts.map((item, index) => (
      <Grid item spacing={2} key={index}>
        <PostItem item={item} />
      </Grid>
    ));
  };

  return loading ? <CircularLoading /> : <>{processList()}</>;
};

export { PostList };
