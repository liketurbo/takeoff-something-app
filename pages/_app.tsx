import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/create-emotion-cache";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps<Props>) {
  const { Component, pageProps } = props;

  const {
    emotionCache = clientSideEmotionCache,
    session,
    ...restPageProps
  } = pageProps;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...restPageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

interface Props {
  emotionCache?: EmotionCache;
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}
