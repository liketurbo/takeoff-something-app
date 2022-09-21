import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/create-emotion-cache";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps<{ emotionCache: EmotionCache }>) {
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
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...restPageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
