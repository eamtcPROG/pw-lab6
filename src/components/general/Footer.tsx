import React from "react";
import PageComponentProps from "interfaces/pagecomponentprops.interface";
import { Box, Typography } from "@mui/material";

const Footer: React.FC<PageComponentProps> = ({ currentRoute }) => {
  return (
    <Box>
      <Typography>Copyright 2024 - All rights reserved Coretchi Mihai</Typography>
    </Box>
  );
};

export { Footer };
