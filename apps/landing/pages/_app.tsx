import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { ThemeProvider } from '@gateway/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Gateway!</title>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
