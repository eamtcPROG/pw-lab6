import React from "react";

import { Stack, Typography } from "@mui/material";

type Props = {
    message?:string
}
const NoResult: React.FC<Props> = ({
    message = "No results"
}) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Typography>{message}</Typography>
    </Stack>
  );
};

export { NoResult };
