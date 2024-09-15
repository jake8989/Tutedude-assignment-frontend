import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import cookie from 'js-cookie';
interface MessageType {
	_id: string;
	chatId: string;
	sender: string;
	senderUsername: string;
	content: string;
}
const useGetChats = () => {
	const [messages, setMessages] = useState<MessageType[]>([
		{
			_id: '',
			chatId: '',
			sender: '',
			senderUsername: '',
			content: '',
		},
	]);
	const [loading, setLoading] = useState<boolean>(false);
	const getChats = async (chat_id: string) => {
		setLoading(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/chat/get-chats`, {
				params: {
					chat_id: chat_id,
				},
				headers: {
					Authorization: `Bearer ${cookie.get('token')}`,
				},
			})
			.then((response: AxiosResponse) => {
				// console.log(response.data);
				setLoading(false);
				setMessages(response.data);
			})
			.catch((err: any) => {
				setLoading(false);
				console.log(err);
			});
	};
	return { getChats, messages, loading, setMessages };
};
export default useGetChats;
