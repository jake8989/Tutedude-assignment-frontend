import useGetAllSentInvitations from '@/hooks/useGetAllSentInvitations';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Text, Avatar, Spinner, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import useAcceptInvite from '@/hooks/useAcceptInvite';
import useGetAllreceivedInvitation from '@/hooks/useGetAllreceivedInvitation';
import useDeleteInvite from '@/hooks/useDeleteInvite';
// interface receivedInvitaionsProps {
// 	receivedInvitaions: Array<{
// 		invitation_id: string;
// 		receiver_id: string;
// 		receiver_profile: string;
// 		receiver_username: string;
// 		sender_id: string;
// 		sender_profile: string;
// 		sender_username: string;
// 	}>;
// 	loadingI: boolean;
// }
const ReceivedInvitations = () => {
	const { acceptInvite, loading } = useAcceptInvite();
	const { GetAllreceivedInvitations, receivedInvitaions, loadingIII } =
		useGetAllreceivedInvitation();
	const { deleteInvite, loadingI } = useDeleteInvite();
	// const handleClick = async () => {
	// 	await acceptInvite();
	const [ct, setCt] = React.useState<number>(0);
	// };

	useEffect(() => {
		const hd = async () => {
			await GetAllreceivedInvitations();
		};
		hd();
	}, [ct]);
	if (loadingIII) {
		return <Spinner></Spinner>;
	}
	return receivedInvitaions.map((invitation: any) => (
		<Box
			border={'1px solid teal'}
			borderRadius={'lg'}
			mt={'14px'}
			padding={'6px'}
			key={invitation.invitation_id}
			// overflow={'hidden'}
		>
			<Box display={'flex'}>
				<Box>
					<Box>
						{' '}
						<Avatar src={`${invitation.sender_profile}`}></Avatar>
						{/* <Avatar src={`${invitation.sender_profile}`}></Avatar> */}
					</Box>
					<Box>
						<Text fontSize={'10px'}>
							{' '}
							Invitation ID: <strong>{invitation.invitation_id}</strong>{' '}
						</Text>
						<Text fontSize={'10px'}>
							{' '}
							Sender: <strong color="teal">
								{invitation.sender_username}
							</strong>{' '}
						</Text>
					</Box>
				</Box>

				<Box ml={'20px'}>
					<Button
						colorScheme="green"
						onClick={async () => {
							setCt((prev) => prev + 1);
							await acceptInvite(invitation.invitation_id);
							await GetAllreceivedInvitations();
						}}
						key={ct}
						isLoading={Boolean(loading)}
					>
						Accept
					</Button>
					<Button
						m={'4px'}
						colorScheme="red"
						isLoading={Boolean(loadingI)}
						onClick={async () => {
							setCt((prev) => prev + 1);
							await deleteInvite(invitation.invitation_id);
							await GetAllreceivedInvitations();
						}}
					>
						<DeleteIcon></DeleteIcon>
					</Button>
				</Box>
			</Box>
		</Box>
	));
};
export default ReceivedInvitations;
