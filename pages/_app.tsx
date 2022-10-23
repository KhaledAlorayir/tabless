import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "../shared/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../shared/store";

const qc = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
