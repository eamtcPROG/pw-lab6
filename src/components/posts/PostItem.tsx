import { PostDto } from "dto/post.dto";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import { CommonTools } from "tools/commontools";
import CommentIcon from "@mui/icons-material/Comment";
import { PostCommentDialog } from "components/posts/PostCommentDialog";
type Props = {
  item: PostDto;
};

const PostItem: React.FC<Props> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography>
            {CommonTools.processObjectField(item, ["title"])}
          </Typography>
          <Typography>
            {CommonTools.processObjectField(item, ["content"])}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleOpen}>
            <CommentIcon />
          </IconButton>
        </CardActions>
      </Card>
      <PostCommentDialog open={open} obj={item} handleClose={handleClose} />
    </React.Fragment>
  );
};

export { PostItem };
