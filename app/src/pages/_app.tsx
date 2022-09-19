import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../contexts/AuthContext';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Products Storage</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
    
     
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              fontFamily: 'Outfit, sans-serif',
              colorScheme: 'light',
            }}
          >
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </MantineProvider>
     
      
    </> 
  );
}