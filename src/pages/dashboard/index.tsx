import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {
  Heading,
  Text,
  Container,
  Button,
  Box,
  useStatStyles,
  Toast,
  useTab,
  CircularProgress,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import User from '@/components/user';
const inter = Inter({ subsets: ['latin'] });
// import { BiUser } from 'react-icons/bi';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { Router } from 'next/router';
import { useRouter } from 'next/router';
import { useSetAvtar } from '@/hooks/useSetAvtar';
import { useUser } from '@/context/UserContext';
import LoadingScreen from '@/components/loadinScreen';
import cookie from 'js-cookie';
export default function dashBoard() {
  // const user = useContext(AuthContext);
  const [preview, setPreview] = useState<string>('');
  const [avtar64, setAvtar64] = useState<any>();
  const toast = useToast();
  const router = useRouter();
  const { user } = useUser();
  console.log('Dashboard', user);
  // if (!user) {
  // 	return <LoadingScreen></LoadingScreen>;
  // }
  useEffect(() => {
    if (window) {
      if (
        !window?.localStorage.getItem('user') ||
        !cookie.get('user_id') ||
        !cookie.get('token')
      ) {
        toast({
          title: 'Error',
          description: 'Login/Signup required for this step',
          isClosable: true,
          duration: 1000,
          status: 'error',
        });
        router.push('/');
      }
    }
  }, []);
  const { setAvatar, loading, error } = useSetAvtar();
  // //////////////////user
  // console.log('dashboard', user);
  // //////////////////////
  // console.log(user.user);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];

    if (file.size > 1024 * 100) {
      return alert('File size greater than 100KB');
    }
    console.log(event.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setPreview(URL.createObjectURL(file));
    reader.onload = () => {
      console.log('67', reader.result);
      setAvtar64(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error?.message);
      return alert('Error In converting File into Base 64');
    };
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(avtar64);
    await setAvatar(avtar64);
    // console.log(loading);
  };
  return (
    <>
      <main>
        <Heading textAlign={'center'} mt={20}>
          Choose Your Avtar
        </Heading>
        <Container mt={90}>
          <Text>
            You can choose your avtar only once, defualt avtar is favicon of
            Next.js{' '}
          </Text>
          <Box mt={8}>
            <img
              alt="Preview"
              className={styles.img}
              src={preview ? preview : '/favicon.ico'}
              style={{ height: '150px', width: '150px' }}
            ></img>
            <Box mt={20} onSubmit={handleSubmit}>
              <label htmlFor="preview">
                {/* upload */}
                <input
                  id="preview"
                  name="preview"
                  accept="image/*"
                  hidden
                  multiple
                  type="file"
                  onChange={(e) => {
                    handleImage(e);
                  }}
                />
                <Button
                  colorScheme="teal"
                  m={'auto'}
                  as={'span'}
                  cursor={'pointer'}
                >
                  Upload
                </Button>
                <Button
                  ml={9}
                  colorScheme="teal"
                  onClick={() => {
                    setPreview('');
                    setAvtar64('');
                  }}
                >
                  Remove
                </Button>
              </label>
            </Box>
          </Box>
          <Button
            colorScheme="teal"
            mt={17}
            rightIcon={<ArrowForwardIcon />}
            onClick={handleSubmit}
            type="submit"
            isLoading={Boolean(loading)}
          >
            Continue
          </Button>
        </Container>
      </main>
    </>
  );
}
