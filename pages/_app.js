// import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import "../styles/header.css";
import { SessionProvider, useSession } from "next-auth/react";

// part added for beautiful dashboard
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { useNProgress } from "../hooks/use-nprogress";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;
// part ended here

//our old one app/////////////////////////////

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

//   const theme = createTheme();
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

//////////////////////////////////////////////////
export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) {
  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>UnivresityMart</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
