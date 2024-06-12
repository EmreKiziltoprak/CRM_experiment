// pages/_app.tsx
import 'reflect-metadata'
import React from 'react'
import { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import './globals.css'
import store from '../app/store/store'
import { I18nextProvider } from 'react-i18next'
import { Roboto } from 'next/font/google'
import { appWithTranslation } from 'next-i18next'
import { IntlProvider } from 'next-intl'
import LanguageSelector from '@/app/components/languageSelector/languageSelector'
import LanguageProvider from '@/app/provider/languageProvider/languageProvider'
import { ThemeProvider, createTheme } from '@mui/material'
import TopBar from '@/app/layouts/navigation/topbar/topbar'
import { SessionProvider } from 'next-auth/react'

const theme = createTheme({
  components: {
    MuiButton: {
      // Target the MuiButton component
      styleOverrides: {
        root: {
          // Target the root element of the button
          boxShadow: 'none', // Remove shadow
        },
        contained: {
          // Target the contained variant for color change
          backgroundColor: '#yourDesiredColor', // Set your desired background color
          '&:hover': {
            // Target the active state
            backgroundColor: 'black', // Set the same background color for active state (removes color change)
          },
          border: '1px solid gray',
        },
      },
    },
  },
  typography: {
    h1: {
      fontWeight: 500, // Adjust headin+g weights as needed
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 400,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 400,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.9rem',
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.9rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.6rem',
      fontWeight: 400,
    },
  },
})

const roboto = Roboto({
  subsets: ['latin'], // Specify character subsets for optimization
  weight: '300', // Choose a different weight (e.g., light)
  display: 'swap',
})
const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LanguageProvider messages={pageProps.messages}>
            <main className={roboto.className} style={{ height: '100%' }}>
              {/*           <LanguageSelector />
               */}{' '}
              <TopBar currentMode="Crm version 0.1.0" />
              <Component {...pageProps} />
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}

export default App
