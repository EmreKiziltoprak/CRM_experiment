// pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../store/store';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
