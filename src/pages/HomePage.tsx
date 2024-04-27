import React from "react";
import PageComponentProps from "interfaces/pagecomponentprops.interface";

import { Box,Button } from "@mui/material";
import { useResource } from "hooks/useResource";

const HomePage: React.FC<PageComponentProps> = ({ currentRoute }) => {
  const { toggleTheme } = useResource();
  return <Box>HomePage

<Button variant="contained" onClick={toggleTheme}>
              Toggle Theme
            </Button>
  </Box>;
};

export { HomePage };
