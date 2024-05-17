import React, { useEffect, useState, useCallback } from "react";

import { Grid, Pagination } from "@mui/material";
import { usePost } from "hooks/usePost";
import { PostItem } from "./PostItem";
import { CircularLoading } from "components/elements/loading/CircularLoading";
import { NoResult } from "components/elements/information/NoResult";
import { PostDto } from "dto/post.dto";

const PostList: React.FC = () => {
  const { posts, getPostsLocal, filterPosts,totalPages } = usePost();
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredPosts, setFilteredPosts] = useState<Array<PostDto>>([]);
  const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);

  const checkLoading = useCallback(() => {
    let loading = false;
    if (!posts) loading = true;
    if (!Array.isArray(posts)) loading = true;
    setLoading(loading);
  }, [posts]);
  const getList = () => {
    setLoading(true);
    getPostsLocal(page);
  };
  useEffect(() => {
    getList();
  }, [page]);

  useEffect(() => {
    checkLoading();
  }, [checkLoading]);

  useEffect(() => {
    if (loading) return;
    setFilteredPosts(filterPosts());
  }, [filterPosts, loading]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const processList = () => {
    if (!posts) return null;
    if (!Array.isArray(posts)) return null;
    if (!posts.length) return <NoResult />;
    if (!filteredPosts.length) return <NoResult />;
    return filteredPosts.map((item, index) => {
      if(index > 10) return null;
      return (
        <Grid item xs={12} sm={12} key={index}>
          <PostItem item={item} />
        </Grid>
      );
    });
  };

  

  return loading ? (
    <CircularLoading />
  ) : (
    <>
      {processList()}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      />
    </>
  );
};

export { PostList };
