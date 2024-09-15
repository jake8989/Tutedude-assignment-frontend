import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
const useGetAllSentInvitations = () => {
	const [loadingII, setLoading] = useState<Boolean>(false);
	const [sentInvitaions, setSentInvitations] = useState<any>([]);
	const GetAllSentInvitations = async () => {
		setLoading(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/all-sent-requests`, {
				headers: {
					Authorization: `Bearer ${cookie.get('token')}`,
				},
			})
			.then((response: AxiosResponse) => {
				setLoading(false);
				// console.log(response);
				setSentInvitations(response.data);
			})
			.catch((err: any) => {
				setLoading(false);
				console.log(err);
			});
	};
	return { GetAllSentInvitations, loadingII, sentInvitaions };
};
export default useGetAllSentInvitations;
