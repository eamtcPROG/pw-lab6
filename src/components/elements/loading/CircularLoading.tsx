import React from "react";

import { Stack, CircularProgress } from "@mui/material";

const CircularLoading: React.FC = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <CircularProgress color="primary" />
    </Stack>
  );
};

export { CircularLoading };
