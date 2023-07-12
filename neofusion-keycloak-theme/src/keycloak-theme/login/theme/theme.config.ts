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
          fontWeight: 500,
          lineHeight: "20px",
          minWidth: "120px",
          textTransform: "capitalize",
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
          color: "#fff",
          fontSize: "16px",
          fontFamily: "BW Modelica",
          fontWeight: 700,
          lineHeight: "20px",
          minWidth: "120px",
          textTransform: "capitalize",
        },
      },
    },
  },
  typography: {
    fontFamily: "Bw Modelica",
  },
};
