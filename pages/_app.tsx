import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { supabase } from "../shared/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLayout from "../components/AppLayout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// change theme logout
const qc = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/home");
      }
      if (event == "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;

/*
TODO:
 - [] Loading/empty handling
 - [] editing
 - [] onAuthChange soultions (tabs)
 - [] pagination
 - [] filter?
*/
