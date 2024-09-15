import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import cookie from 'js-cookie';
export const useLogin = () => {
	const toast = useToast();
	const router = useRouter();
	const [loading, setLoading] = useState<Boolean>(false);
	const [error, setError] = useState<Boolean>(false);
	const [successMessage, seteSuccessMessage] = useState<string>('');
	const { loginUser } = useUser();
	const login = async (postData: { username: string; password: string }) => {
		// console.log('Logging');
		setLoading(true);
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/login`, postData)
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
					cookie.set('token', response.data.token, { expires: 7 });
					loginUser(response.data);
					cookie.set('user_step', response.data.step, { expires: 7 });
					cookie.set('user_id', response.data._id, { expires: 7 });
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
				// if(error.response)
				// console.log(error.response?.data.message);

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
	return { login, loading, error };
};
