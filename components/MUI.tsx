import { PropsWithChildren } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { useTheme } from "../shared/store";

const MUI = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const themeMode = useTheme((store) => store.theme);

  const Theme = createTheme({
    palette: {
      mode,
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMode(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUI;
