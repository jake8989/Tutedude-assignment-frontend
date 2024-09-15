import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
// import { error } from 'console';
import { useUser } from '@/context/UserContext';
import { Toast, useToast } from '@chakra-ui/react';
import cookie from 'js-cookie';
interface User {
  _id: string;
  username: string;
  profile: string;
  email: string;
}
const useGetUser = () => {
  const [ruser, setrUser] = useState<User>({
    _id: '',
    username: '',
    profile: '',
    email: '',
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const toast = useToast();
  const { user } = useUser();
  const getUser = async (username: string) => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/get-userbyusername`,
        {
          params: {
            search: username,
          },
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        // console.log(response);
        if (response.status != 200) {
          // setError(Boolean(true));
          toast({
            title: 'Error',
            description: 'Not Valid Username',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
          return;
        }

        const receivedUser: User = response.data;
        if (user?.user === receivedUser.username) {
          setrUser({ _id: '', username: '', email: '', profile: '' });
          setLoading(false);
          return;
        }
        setrUser(receivedUser);
        setLoading(false);
        // console.log(response.data);
        const foundUser: User = response.data;
        // console.log(foundUser);
      })
      .catch((error: any) => {
        console.log(error);
        setrUser({ _id: '', username: '', email: '', profile: '' });
        toast({
          title: 'Error',
          description: 'Not Valid Username',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  return { getUser, loading, ruser };
};
export default useGetUser;
