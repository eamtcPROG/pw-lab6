import { CommentDto } from "dto/comment.dto";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { CommonTools } from "tools/commontools";
import Close from "@mui/icons-material/Close";

type Props = {
  item: CommentDto;
  deleteFun: (id: string) => void;
};

const CommentItem: React.FC<Props> = ({ item, deleteFun }) => {
  

  const handleDelete = () => {
    if (!item.id) return;
    deleteFun(item.id);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>
            {CommonTools.processObjectField(item, ["content"])}
          </Typography>
          <IconButton onClick={handleDelete}>
            <Close />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { CommentItem };
