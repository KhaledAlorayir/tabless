import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "../shared/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import MUI from "../components/MUI";
import Head from "next/head";

const qc = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Tabless</title>
      </Head>
      <QueryClientProvider client={qc}>
        <MUI>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </MUI>
      </QueryClientProvider>
    </>
  );
}

/*

todo:
- [x] filter reset vali
- [x] fav ico
- [] add by url 
- [] home page text
- [] title
- [] domain
- [] metatags & favicon - fireship
/https://tabless.vercel.app/
*/

export default MyApp;
