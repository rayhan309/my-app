"use client";

import React, { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getMuiTheme } from "@/theme/mui-theme";

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMemo(() => getMuiTheme("dark"), []);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
