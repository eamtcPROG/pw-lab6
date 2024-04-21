import { createTheme, PaletteOptions } from "@mui/material/styles";

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#003366",
    dark: "#D0D0D0",
  },
  secondary: {
    main: "#FF6B6B",
    dark: "#FF9B9B",
  },
  error: {
    main: "#FF3434",
  },
  background: {
    default: "#FAFAFA",
    paper: "#ffffff",
  },

  text: {
    primary: "#333333",
    secondary: "#555555",
    disabled: "#777777",
  },
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#D0D0D0",
    dark: "#D0D0D0",
  },
  secondary: {
    main: "#FF9B9B",
    dark: "#FF9B9B",
  },
  error: {
    main: "#FF3434",
  },
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },

  text: {
    primary: "#E0E0E0",
    secondary: "#A0A0A0",
    disabled: "#808080",
  },
};

const theme = (mode: string) =>
  createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,

    typography: {
      fontFamily: "Open Sans",
      fontSize: 13,
      htmlFontSize: 16,
      h1: {
        fontSize: "2.125rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 700,
      },
      h3: {
        fontSize: "1.625rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.375rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.125rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      caption: {
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: 500,
        letterSpacing: "1 px",
      },

      overline: { fontSize: 12 },
    },
  });

export default theme;
