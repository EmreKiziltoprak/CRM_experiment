// pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import "./globals.css";
import store from '../app/store/store';
import { I18nextProvider } from 'react-i18next';
import { Roboto } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { IntlProvider } from 'next-intl';

const roboto = Roboto({
  subsets: ['latin'], // Specify character subsets for optimization
  weight: '300', // Choose a different weight (e.g., light)
  display: "swap",

});
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <IntlProvider messages={pageProps.messages}>

      <Provider store={store}>
        <main className={roboto.className} style={{ height: "100%" }}>
          <Component {...pageProps} />
        </main>
      </Provider> </IntlProvider>
  );
};

export default App;
