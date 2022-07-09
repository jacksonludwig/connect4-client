import '../styles/globals.css';
import type { AppProps } from 'next/app';
import WebsocketProvider from '../components/context/Websocket';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebsocketProvider>
      <Component {...pageProps} />
    </WebsocketProvider>
  );
}

export default MyApp;
