// pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import "./globals.css";
import store from '../app/store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/app/utils/i18/i18';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], // Specify character subsets for optimization
  weight: '300', // Choose a different weight (e.g., light)
  display: "swap",

});
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <main className={roboto.className}>
      <Component {...pageProps} />
      </main>
    </Provider>
    </I18nextProvider>
  );
};

export default App;
