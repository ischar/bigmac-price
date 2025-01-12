export const lightTheme = {
  background: "#F5F5F5",
  card: "#FFFFFF",
  input: {
    background: "#FFF7E5",
    text: "#4A4A4A",
  },
  button: {
    background: "#FF9800",
    text: "#FFFFFF",
  },
  primary: "#333333",
  secondary: "#757575",
  border: "#E0E0E0",

  borderRadius: "10px",
};

export const darkTheme = {
  background: "#2E2E2E",
  card: "#3A3A3A",
  input: {
    background: "#4A4A4A",
    text: "#EDEDED",
  },
  button: {
    background: "#F57C00",
    text: "#2E2E2E",
  },
  primary: "#EDEDED",
  secondary: "#9E9E9E",
  border: "#4A4A4A",
  borderRadius: "10px",
};

export type ThemeType = typeof lightTheme;
