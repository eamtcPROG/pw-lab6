import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ResourceProvider } from "providers/ResourceProvider";
import { RoutesProvider } from "providers/RoutesProvider";

import theme from "assets/themes/theme";
import { Types } from "tools/types";

import { Provider as PostProvider } from "contexts/post.context";
import { LocalStorageTools } from "tools/localstorage.tools";
import { AuthProvider } from "providers/AuthProvider";
import { MessageProvider } from "providers/MessageProvider";
const App: React.FC = () => {
  const returnDefaultMode = () => {
    const mode = LocalStorageTools.getValue("mode");
    if (!mode) return Types.LIGHT_MODE;
    return mode;
  };

  const [mode, setMode] = useState(returnDefaultMode());
  const [_theme, setTheme] = useState({});

  useEffect(() => {
    setTheme(theme(mode));
  }, [mode]);

  const returnMode = () => {
    return mode === Types.LIGHT_MODE ? Types.DARK_MODE : Types.LIGHT_MODE;
  };
  const toggleTheme = () => {
    LocalStorageTools.saveValue("mode", returnMode());
    setMode(returnMode());
  };

  return (
    <ResourceProvider toggleTheme={toggleTheme} mode={mode}>
      <ThemeProvider theme={_theme}>
        <CssBaseline>
          <MessageProvider>
            <AuthProvider>
              <PostProvider>
                <RoutesProvider />
              </PostProvider>
            </AuthProvider>
          </MessageProvider>
        </CssBaseline>
      </ThemeProvider>
    </ResourceProvider>
  );
};

export default App;
