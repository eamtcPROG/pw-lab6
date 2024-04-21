import React, { useEffect, useState } from "react";

import theme from "assets/themes/theme";

import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, CssBaseline } from "@mui/material";
import { ResourceProvider } from "providers/ResourceProvider";
import { RoutesProvider } from "providers/RoutesProvider";

const App: React.FC = () => {
  const [_theme, setTheme] = useState({});
  const [mode, setMode] = useState("light");

  useEffect(() => {
    setTheme(theme(mode));
  }, [mode]);

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <ResourceProvider>
      <ThemeProvider theme={_theme}>
        <CssBaseline>
          {/* <Box>
            <Button variant="contained" onClick={toggleTheme}>
              Toggle Theme
            </Button>
          </Box>
          <Box>{mode}</Box> */}
          <RoutesProvider />
        </CssBaseline>
      </ThemeProvider>
    </ResourceProvider>
  );
};

export default App;
