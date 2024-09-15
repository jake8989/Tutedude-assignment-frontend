import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
// import { useAuthContext } from './useAuthContext';
import cookie from 'js-cookie';
interface User {
  user: {
    token: string;
  };
}

export const useRegister = () => {
  const toast = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User>({ user: { token: '' } });
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  // console.log(user);
  const { loginUser } = useUser();
  const [successMessage, seteSuccessMessage] = useState<string>('');
  // const { dispatch } = useAuthContext();
  const register = async (postData: {
    username: string;
    email: string;
    password: string;
  }) => {
    // console.log('Registering');
    setLoading(true);
    // console.log(process.env.NEXT_PUBLIC_BACKEND);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/register`,
        postData,
      )
      .then((response: AxiosResponse) => {
        // const json = response.json();
        // console.log('Success\n');
        if (response.status === 200) {
          setLoading(false);
          setError(false);
          // console.log(response);
          toast({
            title: 'Success',
            description: `${response.data.message}`,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          cookie.set('token', response.data.token);
          cookie.set('user_step', response.data.step, { expires: 7 });
          cookie.set('user_id', response.data._id, { expires: 7 });
          loginUser(response.data);
          router.push('/dashboard');
        } else {
          setError(true);
          toast({
            title: 'Failure',
            description: `${response.data.message}`,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error: any) => {
        // console.log('Fail\n');
        setError(true);
        setLoading(false);
        // console.log(error.response.data.message);

        if (!error.response) {
          toast({
            title: 'Failure',
            description: `Server not working`,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        toast({
          title: 'Failure',
          description: `${error.response?.data.message}`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return { register, loading, error };
};
