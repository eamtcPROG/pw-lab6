import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="primary" />
    </Box>
  );
};

export { Loading };
