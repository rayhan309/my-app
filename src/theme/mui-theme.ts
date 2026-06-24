import { createTheme, type Theme } from "@mui/material/styles";

const sharedTypography = {
  fontFamily: "var(--font-inter), sans-serif",
  button: { textTransform: "none" as const, fontWeight: 600 },
  h1: { fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08 },
  h2: { fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.12 },
  h3: { fontWeight: 700, letterSpacing: "-0.02em" },
  subtitle1: { fontWeight: 500 },
  body1: { lineHeight: 1.7 },
};

const sharedComponents = (mode: "light" | "dark") => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        backgroundColor: "var(--background)",
      },
      body: {
        backgroundColor: "transparent",
      },
      "#smooth-wrapper": {
        backgroundColor: "transparent",
      },
      "#smooth-content": {
        backgroundColor: "transparent",
      },
      main: {
        backgroundColor: "transparent",
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 999,
        fontWeight: 700,
        paddingInline: "1.35rem",
      },
      containedPrimary: {
        boxShadow:
          mode === "dark"
            ? "0 10px 30px rgba(59, 130, 246, 0.22)"
            : "0 10px 30px rgba(37, 99, 235, 0.18)",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor:
          mode === "dark"
            ? "rgba(15, 23, 42, 0.4)"
            : "rgba(255, 255, 255, 0.55)",
        backgroundImage: "none",
        backdropFilter: "blur(14px)",
        borderRadius: 16,
        border: `1px solid ${
          mode === "dark"
            ? "rgba(148, 163, 184, 0.14)"
            : "rgba(226, 232, 240, 0.9)"
        }`,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        "&:hover": {
          borderColor:
            mode === "dark"
              ? "rgba(59, 130, 246, 0.35)"
              : "rgba(37, 99, 235, 0.28)",
          boxShadow:
            mode === "dark"
              ? "0 18px 40px rgba(15, 23, 42, 0.45)"
              : "0 18px 40px rgba(15, 23, 42, 0.08)",
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor:
          mode === "dark"
            ? "rgba(15, 23, 42, 0.4)"
            : "rgba(255, 255, 255, 0.55)",
        backgroundImage: "none",
        backdropFilter: "blur(14px)",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backdropFilter: "blur(16px)",
        boxShadow: "none",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "outlined" as const,
      fullWidth: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor:
          mode === "dark"
            ? "rgba(2, 6, 23, 0.45)"
            : "rgba(248, 250, 252, 0.85)",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
      },
      filled: {
        border: `1px solid ${
          mode === "dark"
            ? "rgba(59, 130, 246, 0.22)"
            : "rgba(37, 99, 235, 0.15)"
        }`,
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 6,
        borderRadius: 999,
        backgroundColor:
          mode === "dark"
            ? "rgba(148, 163, 184, 0.14)"
            : "rgba(100, 116, 139, 0.12)",
      },
      bar: {
        borderRadius: 999,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 700,
        textTransform: "uppercase" as const,
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
      },
    },
  },
});

export function getMuiTheme(mode: "light" | "dark"): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#3b82f6" : "#2563eb",
        contrastText: "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#8b5cf6" : "#7c3aed",
      },
      success: {
        main: "#22c55e",
      },
      error: {
        main: "#ef4444",
      },
      background: {
        default: mode === "dark" ? "#020617" : "#f8fafc",
        paper:
          mode === "dark"
            ? "rgba(15, 23, 42, 0.4)"
            : "rgba(255, 255, 255, 0.55)",
      },
      text: {
        primary: mode === "dark" ? "#f8fafc" : "#0f172a",
        secondary: mode === "dark" ? "#94a3b8" : "#64748b",
      },
      divider:
        mode === "dark"
          ? "rgba(148, 163, 184, 0.14)"
          : "rgba(226, 232, 240, 0.95)",
    },
    shape: {
      borderRadius: 12,
    },
    typography: sharedTypography,
    components: sharedComponents(mode),
  });
}
