"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { portalTheme } from "./portal-theme";
import { portalColors } from "./effects";

export function PortalThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={portalTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--button-highlight": portalColors.buttonHighlight,
              "--launcher-start": portalColors.launcherStart,
              "--launcher-end": portalColors.launcherEnd,
              "--launcher-hover": portalColors.launcherHover,
            },
          }}
        />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
