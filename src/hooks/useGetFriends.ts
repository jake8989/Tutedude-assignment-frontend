import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import cookie from 'js-cookie';
import { useToast } from '@chakra-ui/react';
interface usersFriends {
  _id: string;
  friendEmail: string;
  friendId: string;
  friendProfile: string;
  friendUsername: string;
}
const useGetFriends = () => {
  const toast = useToast();
  const [loadingI, setLoading] = useState<Boolean>(false);

  const [usersFriends, setUsersFriends] = useState<usersFriends[]>([
    {
      _id: '',
      friendEmail: '',
      friendId: '',
      friendProfile: '',
      friendUsername: '',
    },
  ]);
  const getFriends = async () => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/users-friends`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setLoading(false);
        console.log(response.data);
        setUsersFriends(response.data.result);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };
  const unfriendUser = async (friendShipId: string) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/unfriend-user`,
        { friendShipId },
        {
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setLoading(false);
        setUsersFriends((prevUsers) =>
          prevUsers.filter((users) => users._id !== friendShipId),
        );
        toast({
          title: 'Success',
          description: 'Unfriended!',
          status: 'info',
        });
      })
      .catch((err: any) => {
        setLoading(false);
        // console.log(err.response.data);
        toast({
          title: 'Error',
          description: `${err.response.data.message}`,
          status: 'info',
        });
      });
  };
  return { getFriends, loadingI, usersFriends, setUsersFriends, unfriendUser };
};
export default useGetFriends;
