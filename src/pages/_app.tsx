import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@/context/UserContext';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}
