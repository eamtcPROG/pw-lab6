import { Box, Typography } from "@mui/material";
import { CommentList } from "components/comments/CommentList";
import { FormDialog } from "components/elements/dialog/FormDialog";
import { PostDto } from "dto/post.dto";
import React from "react";
import { CommonTools } from "tools/commontools";

type Props = {
  obj: PostDto;
  open: boolean;
  handleClose: () => void;
};
const PostCommentDialog: React.FC<Props> = ({ obj, open, handleClose }) => {
  return (
    <FormDialog
      open={open}
      handleClose={handleClose}
      title={CommonTools.processObjectField(obj, ["title"])}
    >
      <Box>
        <Typography>
          {CommonTools.processObjectField(obj, ["content"])}
        </Typography>
      </Box>
      <Box>
        <Typography>Comments</Typography>
      </Box>
      <Box mt={3}>
        <CommentList idPost={obj.id} />
      </Box>
    </FormDialog>
  );
};

export { PostCommentDialog };
