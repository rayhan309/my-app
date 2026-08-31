import { createTheme, type Theme } from "@mui/material/styles";

const displayFont = 'var(--font-instrument), "Times New Roman", serif';
const bodyFont = "var(--font-outfit), sans-serif";

const sharedTypography = {
  fontFamily: bodyFont,
  button: { textTransform: "none" as const, fontWeight: 500, letterSpacing: "0.01em" },
  h1: {
    fontFamily: displayFont,
    fontWeight: 400,
    letterSpacing: "-0.035em",
    lineHeight: 1.05,
  },
  h2: {
    fontFamily: displayFont,
    fontWeight: 400,
    letterSpacing: "-0.03em",
    lineHeight: 1.12,
  },
  h3: {
    fontFamily: displayFont,
    fontWeight: 400,
    letterSpacing: "-0.02em",
  },
  h4: {
    fontFamily: displayFont,
    fontWeight: 400,
  },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 500 },
  body1: { lineHeight: 1.75 },
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
        borderRadius: 8,
        fontWeight: 500,
        paddingInline: "1.25rem",
        paddingBlock: "0.65rem",
        cursor: "pointer",
        "&:disabled": {
          cursor: "not-allowed",
        },
      },
      containedPrimary: {
        boxShadow: "none",
      },
      outlined: {
        borderColor: mode === "dark" ? "rgba(236, 231, 220, 0.18)" : "rgba(22, 20, 18, 0.16)",
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        cursor: "pointer",
        "&:disabled": {
          cursor: "not-allowed",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: mode === "dark" ? "#141311" : "#fffdf8",
        backgroundImage: "none",
        backdropFilter: "none",
        borderRadius: 18,
        border: `1px solid ${
          mode === "dark" ? "rgba(236, 231, 220, 0.08)" : "rgba(22, 20, 18, 0.08)"
        }`,
        boxShadow: "none",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        "&:hover": {
          borderColor:
            mode === "dark" ? "rgba(228, 201, 160, 0.35)" : "rgba(138, 67, 36, 0.28)",
          boxShadow: "none",
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: mode === "dark" ? "#141311" : "#fffdf8",
        backgroundImage: "none",
        backdropFilter: "none",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backdropFilter: "blur(18px)",
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
        borderRadius: 10,
        backgroundColor: mode === "dark" ? "rgba(11, 10, 9, 0.55)" : "rgba(255, 253, 248, 0.9)",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        fontSize: "0.7rem",
        letterSpacing: "0.04em",
        textTransform: "none" as const,
        borderRadius: 6,
      },
      filled: {
        border: `1px solid ${
          mode === "dark" ? "rgba(228, 201, 160, 0.18)" : "rgba(138, 67, 36, 0.12)"
        }`,
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 4,
        borderRadius: 999,
        backgroundColor:
          mode === "dark" ? "rgba(236, 231, 220, 0.1)" : "rgba(22, 20, 18, 0.08)",
      },
      bar: {
        borderRadius: 999,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 10,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 600,
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
        main: mode === "dark" ? "#e4c9a0" : "#8a4324",
        contrastText: mode === "dark" ? "#1a1612" : "#fffaf3",
      },
      secondary: {
        main: mode === "dark" ? "#9a9386" : "#6f685c",
      },
      success: {
        main: "#6f8f6a",
      },
      error: {
        main: "#c45c4a",
      },
      background: {
        default: mode === "dark" ? "#0b0a09" : "#f4f0e8",
        paper: mode === "dark" ? "#141311" : "#fffdf8",
      },
      text: {
        primary: mode === "dark" ? "#ece7dc" : "#161412",
        secondary: mode === "dark" ? "#9a9386" : "#6f685c",
      },
      divider:
        mode === "dark" ? "rgba(236, 231, 220, 0.08)" : "rgba(22, 20, 18, 0.08)",
    },
    shape: {
      borderRadius: 10,
    },
    typography: sharedTypography,
    components: sharedComponents(mode),
  });
}
