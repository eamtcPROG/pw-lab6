import { CommentDto } from "dto/comment.dto";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { CommonTools } from "tools/commontools";
type Props = {
  item: CommentDto;
};

const CommentItem: React.FC<Props> = ({ item }) => {
  return (
    
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {CommonTools.processObjectField(item, ["content"])}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { CommentItem };
