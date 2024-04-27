import React, { useState } from "react";
import PageComponentProps from "interfaces/pagecomponentprops.interface";

import { Box, Grid, Container } from "@mui/material";
import { PostList } from "components/posts/PostList";
import { AddPostButton } from "components/posts/AddPostButton";
import { FormDialog } from "components/elements/dialog/FormDialog";
import { FormPost } from "components/posts/FormPost";

const HomePage: React.FC<PageComponentProps> = ({ currentRoute }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1 ,mt:3}}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <PostList />
        </Grid>
        <AddPostButton handleOnClick={handleOpen} />
        <FormDialog open={open} handleClose={handleClose} title="Add Post">
          <FormPost handleClose={handleClose} />
        </FormDialog>
      </Box>
    </Container>
  );
};

export { HomePage };
