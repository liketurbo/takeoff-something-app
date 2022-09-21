import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";

import createEmotionCache from "../src/create-emotion-cache";
import theme from "../src/theme";

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
