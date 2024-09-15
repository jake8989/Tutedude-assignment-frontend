import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { useAuthContext } from './useAuthContext';
import { useUser } from '@/context/UserContext';
import { BooleanLiteral } from 'typescript';
import cookie from 'js-cookie';
import { useToast } from '@chakra-ui/react';
export const useLogout = () => {
	const router = useRouter();
	// const { dispatch } = useAuthContext();
	const { logoutUser } = useUser();
	const [loggedOut, setLoggedOut] = useState<Boolean>(Boolean(false));
	const toast = useToast();
	const logout = () => {
		cookie.remove('token');
		cookie.remove('user_step');
		cookie.remove('chat_selected');
		cookie.remove('user_id');
		cookie.remove('current_friend');
		cookie.remove('current_friend_username');
		logoutUser();
		router.push('/');
		toast({
			title: 'Message:',
			description: 'Logged Out Successfully',
			status: 'info',
			duration: 2000,
			isClosable: true,
		});
	};
	return { logout, loggedOut };
};
