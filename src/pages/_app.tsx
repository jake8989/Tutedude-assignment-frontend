import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@/context/UserContext';
import { SentInvitationsProvider } from '@/context/SentInvitations';
import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SentInvitationsProvider>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </SentInvitationsProvider>
  );
}
