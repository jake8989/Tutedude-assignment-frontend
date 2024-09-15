import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import cookie from 'js-cookie';
import { useToast } from '@chakra-ui/react';
const useAcceptInvite = () => {
	const [loading, setLoading] = useState<Boolean>(false);
	const toast = useToast();
	const acceptInvite = async (invitation_id: string) => {
		setLoading(true);
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/accept-invite`,
				{ invitation_id: invitation_id },
				{
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
					},
				}
			)
			.then((response: AxiosResponse) => {
				setLoading(false);
				// console.log(response.data);
				toast({
					title: 'Adding...',
					description: 'You are now friends',
					duration: 2000,
					status: 'info',
				});
			})
			.catch((err: any) => {
				setLoading(false);
				toast({
					title: 'Adding...',
					description: `${err.response?.data.message}`,
					duration: 2000,
					status: 'error',
				});
				// console.log(err.response.data);
			});
	};
	return { acceptInvite, loading };
};
export default useAcceptInvite;
