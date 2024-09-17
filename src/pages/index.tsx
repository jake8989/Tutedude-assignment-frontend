import Head from 'next/head';
import { Heading, Text, Container } from '@chakra-ui/react';

import User from '@/components/user';

import { Footer } from '@/components/footer';
export default function Home() {
  return (
    <>
      <main>
        <div>
          <Head>
            <title>Dude's</title>
          </Head>
        </div>
        <Container mt={7}>
          <Heading textAlign={'center'}>Dude's</Heading>
          {/* <Text textAlign={'center'}>Chat in groups with friend's</Text> */}
        </Container>
        <Container mt={20}>
          <User></User>
        </Container>
        <Footer></Footer>
      </main>
    </>
  );
}
