import { Main } from 'next/document';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Box,
	Avatar,
	Spinner,
} from '@chakra-ui/react';
import { Button, Input } from '@chakra-ui/react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import cookies from 'js-cookie';
import useGetChats from '@/hooks/useGetChats';
import chatStyles from '../styles/ChatBox.module.css';
import { useRef } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useToast } from '@chakra-ui/react';
import socket from '@/socket-manager/socket';
const customTheme = extendTheme({
	styles: {
		global: {
			'::-webkit-scrollbar': {
				width: '2px',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: 'teal.500', // Color of the thumb
				borderRadius: 'full',
			},
		},
	},
});
interface chatProps {
	chatId: string;
	currentFriend: string;
	currentFriendUsername: string;
}
interface MessageType {
	_id: string;
	chatId: string;
	sender: string;
	senderUsername: string;
	content: string;
}
const Chat: React.FC<chatProps> = ({
	chatId,
	currentFriend,
	currentFriendUsername,
}) => {
	const { getChats, messages, loading, setMessages } = useGetChats();
	const toast = useToast();
	const [newMessage, setNewMessage] = useState<string>('');
	const [arrivalMessage, setArrivalMessage] = useState<MessageType>({
		_id: '',
		chatId: '',
		sender: '',
		senderUsername: '',
		content: '',
	});

	const [ll, setLL] = useState<boolean>(false);
	socket.on('chat', (message) => {
		console.log(message);
	});
	const user_id = cookie.get('user_id');
	useEffect(() => {
		socket.emit('addUser', user_id);
		socket.on('getUsers', (users) => {
			console.log(users);
		});
	}, [chatId]);
	useEffect(() => {
		console.log(chatId);
	}, [chatId]);
	useEffect(() => {
		const chats = async () => {
			await getChats(chatId);
		};
		chats();
	}, [chatId]);
	const messageHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setNewMessage(event.target.value);
	};
	const messageSendButtonHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		if (newMessage.trim() === '') {
			toast({
				title: 'Warning',
				description: `Empty Message`,
				status: 'warning',
				duration: 2000,
				isClosable: false,
			});
			return;
		}
		const postData = {
			chatId: chatId,
			content: newMessage,
		};
		setLL(true);
		const sender_id = cookie.get('user_id');
		socket.emit('send-message', {
			sender_id,
			receiver_id: currentFriend,
			content: newMessage,
		});
		try {
			const result = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/chat/save-chat`,
				postData,
				{
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
					},
				}
			);
			setLL(false);
			setNewMessage('');
			await getChats(chatId);
		} catch (error) {
			setNewMessage('');
			setLL(false);
			console.log(error);
		}
	};
	const chatRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);
	useEffect(() => {
		socket.on('get-message', (data) => {
			setArrivalMessage({
				_id: 'ArrivalId',
				chatId: 'ArrivalChatId',
				sender: data.sender_id,
				senderUsername: data.senderUsername,
				content: data.content,
			});
		});
	}, []);
	useEffect(() => {
		if (arrivalMessage && currentFriend === arrivalMessage.sender) {
			setMessages((prev) => [...prev, arrivalMessage]);
		}
	}, [arrivalMessage, currentFriend]);
	return (
		<ChakraProvider theme={customTheme}>
			<Box
				display={'flex'}
				justifyContent={'center'}
				mt={'20px'}
				flexDirection={'column'}
				alignItems={'center'}
			>
				<Box>
					<Text textAlign={'center'} fontSize={'12px'}>
						{' '}
						ChatId: {chatId}
					</Text>
					<Text textAlign={'center'} fontSize={'14px'} color={'teal'}>
						{' '}
						FriendUsername: {currentFriendUsername}
					</Text>
				</Box>

				<Card
					width={'84%'}
					maxHeight={'500px'}
					overflowY={'scroll'}
					ref={chatRef}
				>
					<CardBody>
						<Box display={'flex'} flexDirection={'column'}>
							{/* {loading && <Spinner></Spinner>} */}
							{messages.map((message) => (
								<Card
									key={message._id}
									maxWidth={'70%'}
									className={
										message.sender !== cookies.get('user_id')
											? chatStyles.receiveMessage
											: chatStyles.sentMessage
									}
								>
									<Text fontSize={'8px'}>
										{message.sender === cookies.get('user_id')
											? 'You'
											: message.senderUsername}
									</Text>
									<Text fontSize={'16px'} textAlign={'left'}>
										{message.content}
									</Text>
								</Card>
							))}
						</Box>
					</CardBody>
				</Card>
			</Box>
			<Box
				width={'100%'}
				display={'flex'}
				mb={'10px'}
				mt={'5px'}
				justifyContent={'center'}
				alignItems={'center'}
				flexDirection={'row'}
			>
				<Box
					width={'80%'}
					display={'flex'}
					flexDirection={'row'}
					justifyContent={'center'}
					as="form"
				>
					<Input
						placeholder="Type Message..."
						onChange={messageHandler}
						value={newMessage}
					></Input>
					<Button
						onClick={messageSendButtonHandler}
						isLoading={ll}
						type="submit"
					>
						{' '}
						Send
					</Button>
				</Box>
			</Box>
		</ChakraProvider>
	);
};

export default Chat;
