import React from "react";
import PageComponentProps from "interfaces/pagecomponentprops.interface";

import { Box, Grid } from "@mui/material";
import { PostList } from "components/posts/PostList";
import { AddPostButton } from "components/posts/AddPostButton";

const HomePage: React.FC<PageComponentProps> = ({ currentRoute }) => {
  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        
      >
        <PostList />
            
      </Grid>
      <AddPostButton handleOnClick={()=>{
          console.log("Add Post Button Clicked")
        }}/>
    </Box>
  );
};

export { HomePage };
