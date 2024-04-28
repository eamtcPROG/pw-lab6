import React, { useEffect, useState, useCallback } from "react";

import { Grid } from "@mui/material";
import { usePost } from "hooks/usePost";
import { PostItem } from "./PostItem";
import { CircularLoading } from "components/elements/loading/CircularLoading";
import { NoResult } from "components/elements/information/NoResult";
import { PostDto } from "dto/post.dto";

const PostList: React.FC = () => {
  const { posts, getPostsLocal,filterPosts } = usePost();
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredPosts, setFilteredPosts] = useState<Array<PostDto>>([]);

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

  useEffect(() => {
    if(loading) return;
    setFilteredPosts(filterPosts());
  }, [filterPosts,loading]);

  const processList = () => {
    if (!posts) return null;
    if (!Array.isArray(posts)) return null;
    if (!posts.length) return <NoResult />;
    if(!filteredPosts.length) return <NoResult />;
    return filteredPosts.map((item, index) => (
      <Grid item xs={12} sm={12}  key={index}>
        <PostItem item={item} />
      </Grid>
    ));
  };

  return loading ? <CircularLoading /> : <>{processList()}</>;
};

export { PostList };
