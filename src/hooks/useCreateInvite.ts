import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
const useCreateInvite = () => {
	const [loadingI, setLoading] = useState<Boolean>(false);
	const toast = useToast();
	const createInvite = async (receiver_id: string) => {
		setLoading(true);
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/create-invitation`,
				{
					receiver_id: receiver_id,
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
					},
				}
			)
			.then((response: AxiosResponse) => {
				setLoading(false);
				// console.log(response);
				toast({
					title: 'Success',
					description: `${response.data.message}`,
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((err: any) => {
				setLoading(false);
				console.log(err);
				toast({
					title: 'Error',
					description: `${err.response?.data.message}`,
					status: 'error',
					duration: 2000,
					isClosable: true,
				});
				console.log(err);
			});
	};
	return { createInvite, loadingI };
};
export default useCreateInvite;
