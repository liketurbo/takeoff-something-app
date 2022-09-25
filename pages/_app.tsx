import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import createEmotionCache from "../src/create-emotion-cache";
import { store } from "../src/store";
import theme from "../src/theme";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps<Props>) {
  const { Component, pageProps } = props;

  const {
    emotionCache = clientSideEmotionCache,
    session,
    ...restPageProps
  } = pageProps;

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...restPageProps} />
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </Provider>
  );
}

interface Props {
  emotionCache?: EmotionCache;
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}
