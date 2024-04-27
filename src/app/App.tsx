import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ResourceProvider } from "providers/ResourceProvider";
import { RoutesProvider } from "providers/RoutesProvider";
import { useResource } from "hooks/useResource";
import theme from "assets/themes/theme";
import { Types } from "tools/types";
const App: React.FC = () => {
  const [mode, setMode] = useState(Types.LIGHT_MODE);
  const [_theme, setTheme] = useState({});

  useEffect(() => {
    setTheme(theme(mode));
    console.log(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(mode === Types.LIGHT_MODE ? Types.DARK_MODE : Types.LIGHT_MODE);
  };

  return (
    <ResourceProvider toggleTheme={toggleTheme} mode={mode}>
      <ThemeProvider theme={_theme}>
        <CssBaseline>
          <RoutesProvider />
        </CssBaseline>
      </ThemeProvider>
    </ResourceProvider>
  );
};

export default App;
