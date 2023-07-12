import { ThemeOptions } from "@mui/material/styles";

export const THEME_CONFIG: ThemeOptions = {
  palette: {
    primary: {
      main: "#211F42",
    },
    secondary: {
      main: "#51AF4E",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F8F8F8",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontSize: "16px",
          fontFamily: "BW Modelica",
          fontStyle: "normal",
          fontWeight: 500,
          width: "100%",
          textTransform: "capitalize",
          "& label": {
            color: "#929292",
            letterSpacing: "0.15px",
          },
          "& label.Mui-focused": {
            color: "#929292",
            backgroundColor: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#D9D9D9",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9D9D9",
            },
            "&:hover fieldset": {
              borderColor: "#D9D9D9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D9D9D9",
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
      },
      styleOverrides: {
        root: {
          minHeight: "42px",
          padding: "0.5rem 1.37rem",
          color: "#fff",
          fontSize: "0.75rem",
          fontFamily: "BW Modelica",
          fontWeight: 700,
          fontStyle: "normal",
          minWidth: "120px",
          textTransform: "uppercase",
          letterSpacing: "0.42px",
          borderRadius: 4,
        },
      },
    },
  },
  typography: {
    fontFamily: "Bw Modelica",
    fontSize: 16,
  },
};
