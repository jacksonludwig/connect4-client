import '../styles/globals.css';
import type { AppProps } from 'next/app';
import WebsocketProvider from '../components/context/Websocket';
import { createStandaloneToast } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  const { ToastContainer } = createStandaloneToast();

  return (
    <WebsocketProvider>
      <>
        <Component {...pageProps} />
        <ToastContainer />
      </>
    </WebsocketProvider>
  );
}

export default MyApp;
