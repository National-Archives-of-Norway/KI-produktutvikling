"use client";
import { themeDark } from "@digitalarkivet/mui-theme";
import { createTheme } from "@mui/material/styles";
import { portalColors } from "./effects";

// Digitalarkivets profilfarger og typografi, med portalens egne mørke flater.
export const portalTheme = createTheme({
  cssVariables: { cssVarPrefix: "mui" },
  palette: {
    ...themeDark.palette,
    mode: "dark",
    background: {
      ...themeDark.palette.background,
      default: portalColors.background,
      paper: portalColors.surface,
    },
    primary: {
      ...themeDark.palette.primary,
      contrastText: themeDark.palette.text.primaryInvert,
    },
  },
  typography: themeDark.typography,
  shape: themeDark.shape,
  customShape: themeDark.customShape,
  components: {
    ...themeDark.components,
    MuiCssBaseline: {
      styleOverrides: {
        "a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible":
          {
            outline: `3px solid ${themeDark.palette.secondary.main}`,
            outlineOffset: "4px",
          },
      },
    },
  },
});
