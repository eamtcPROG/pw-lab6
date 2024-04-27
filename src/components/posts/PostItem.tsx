import { PostDto } from "dto/post.dto";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { CommonTools } from "tools/commontools";
type Props = {
  item: PostDto;
};

const PostItem: React.FC<Props> = ({ item }) => {
  return (
    
    <Card>
      <CardContent>
        <Typography>
          {CommonTools.processObjectField(item, ["title"])}
        </Typography>
        <Typography>
          {CommonTools.processObjectField(item, ["content"])}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { PostItem };
