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
import Close from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import { PostCommentDialog } from "components/posts/PostCommentDialog";
import { usePost } from "hooks/usePost";
import { FormDialog } from "components/elements/dialog/FormDialog";
import { FormPost } from "./FormPost";
type Props = {
  item: PostDto;
};

const PostItem: React.FC<Props> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { deletePost, editPost } = usePost();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleDelete = () => {
    if (!item.id) return;
    deletePost(item.id);
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
          <IconButton onClick={handleDelete}>
            <Close />
          </IconButton>
          <IconButton onClick={handleOpenEdit}>
            <Edit />
          </IconButton>
        </CardActions>
      </Card>
      <PostCommentDialog open={open} obj={item} handleClose={handleClose} />
      <FormDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Edit Post"
      >
        <FormPost
          handleClose={handleCloseEdit}
          onSubmit={editPost}
          defaultObj={item}
        />
      </FormDialog>
    </React.Fragment>
  );
};

export { PostItem };
