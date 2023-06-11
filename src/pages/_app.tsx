import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import './editors/lexical/lexical.css';
import './editors/editorjs/editorjs-style.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
