import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
	useDisclosure,
	Box,
	Avatar,
	Text,
	Spinner,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import useGetFriends from '@/hooks/useGetFriends';
import cookie from 'js-cookie';
import socket from '@/socket-manager/socket';
interface chatSelectionProps {
	onChatSelected: (chatId: string) => void;
	onFriendSelected: (friend_id: string, friend_username: string) => void;
}
interface onLineUsers {
	user_id: string;
	socket_id: string;
}
const DrawerExample: React.FC<chatSelectionProps> = ({
	onChatSelected,
	onFriendSelected,
}) => {
	const [onlineUsers, setOnlineUsers] = useState<onLineUsers[]>([
		{
			user_id: '',
			socket_id: '',
		},
	]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement | null>(null);
	const { getFriends, loadingI, usersFriends } = useGetFriends();
	React.useEffect(() => {
		const hd = async () => {
			await getFriends();
		};
		hd();
	}, []);
	// const [ct, setCt] = useState<number>(0);
	const userId = cookie.get('user_id');
	useEffect(() => {
		socket.on('getUsers', (users) => {
			setOnlineUsers(users);
		});
	}, [usersFriends]);
	useEffect(() => {
		socket.on('getUsers', (users) => {
			setOnlineUsers(users);
		});
	}, []);
	console.log(onlineUsers);

	if (loadingI) {
		return <Spinner></Spinner>;
	}
	const LoadChat = (id: string, friend_id: string, friend_username: string) => {
		console.log(id);
		onChatSelected(id);
		onFriendSelected(friend_id, friend_username);
		onClose();
		cookie.set('chat_selected', id, { expires: 7 });
		cookie.set('current_friend', friend_id, { expires: 7 });
		cookie.set('current_friend_username', friend_username, { expires: 7 });
	};

	return (
		<>
			<Button
				ref={btnRef}
				// colorScheme="teal"
				onClick={onOpen}
				m={'5px'}
				// _fullScreen={}
			>
				<HamburgerIcon></HamburgerIcon>
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>My Friends</DrawerHeader>

					<DrawerBody>
						{usersFriends.map((friend) => (
							<Box
								key={friend._id}
								onClick={(e) =>
									LoadChat(friend._id, friend.friendId, friend.friendUsername)
								}
								cursor={'pointer'}
							>
								<Box
									border={'1px solid teal'}
									borderRadius={'lg'}
									mt={'14px'}
									padding={'6px'}
									key={friend._id}
									display={'flex'}
									flexDirection={'row'}
									// overflow={'hidden'}
								>
									<Box>
										{onlineUsers.find(
											(user) => user.user_id === friend.friendId
										) && (
											<Text color={'green'} fontSize={'8px'}>
												<strong>Online ●</strong>
											</Text>
										)}{' '}
										<Avatar src={`${friend.friendProfile}`}></Avatar>
										{/* <Avatar src={`${invitation.sender_profile}`}></Avatar> */}
									</Box>
									<Box ml={'20px'}>
										<Text fontSize={'14px'} color="teal">
											Username: <strong>{friend.friendUsername}</strong>
										</Text>
										<Text fontSize={'14px'} color="teal">
											Email: <strong>{friend.friendEmail}</strong>
										</Text>

										<Text fontSize={'8px'} color="teal">
											FriendID: <strong>{friend.friendId}</strong>
										</Text>
									</Box>

									{/* <Text fontSize={'10px'}>
                  {' '}
                  Status: <strong color="teal">PENDING</strong>{' '}
               </Text> */}
								</Box>
							</Box>
						))}
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme="blue" onClick={onClose}>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};
export default DrawerExample;
