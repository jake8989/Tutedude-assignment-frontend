import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
const useGetAllSentInvitations = () => {
  const [sentInvitaions, setSentInvitations] = useState<any[]>([]);
  const [loadingII, setLoading] = useState<boolean>(false);
  const GetAllSentInvitationsByBackend = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/all-sent-requests`,
          {
            headers: {
              Authorization: `Bearer ${cookie.get('token')}`,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setLoading(false);
          // console.log(response);
          setSentInvitations(response.data);
        })
        .catch((err: any) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return { GetAllSentInvitationsByBackend, loadingII, sentInvitaions };
};
export default useGetAllSentInvitations;
