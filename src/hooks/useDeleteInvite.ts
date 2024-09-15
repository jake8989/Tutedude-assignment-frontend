import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import cookie from 'js-cookie';
const useDeleteInvite = () => {
  const [loadingI, setLoading] = useState<Boolean>(false);
  const deleteInvite = async (invitation_id: string) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/delete-invitation`,
        { invitation_id: invitation_id },
        {
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setLoading(false);
        // console.log(response.data);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err.response?.data);
      });
  };
  return { deleteInvite, loadingI };
};
export default useDeleteInvite;
