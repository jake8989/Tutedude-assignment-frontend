import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import cookie from 'js-cookie';
interface usersFriends {
	_id: string;
	friendEmail: string;
	friendId: string;
	friendProfile: string;
	friendUsername: string;
}
const useGetFriends = () => {
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
			.get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/users-friends`, {
				headers: {
					Authorization: `Bearer ${cookie.get('token')}`,
				},
			})
			.then((response: AxiosResponse) => {
				setLoading(false);
				setUsersFriends(response.data.result);
			})
			.catch((err: any) => {
				setLoading(false);
				console.log(err.response.data);
			});
	};
	return { getFriends, loadingI, usersFriends };
};
export default useGetFriends;
