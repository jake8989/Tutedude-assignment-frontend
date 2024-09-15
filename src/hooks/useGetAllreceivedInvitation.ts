import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
const useGetAllreceivedInvitation = () => {
  const [loadingIII, setLoading] = useState<Boolean>(false);
  const [receivedInvitaions, setreceivedInvitations] = useState<any>([]);
  const GetAllreceivedInvitations = async () => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/all-received-requests`, {
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
      })
      .then((response: AxiosResponse) => {
        setLoading(false);
        // console.log(response);
        setreceivedInvitations(response.data);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log('err from ', err);
      });
  };
  return { GetAllreceivedInvitations, loadingIII, receivedInvitaions };
};
export default useGetAllreceivedInvitation;
