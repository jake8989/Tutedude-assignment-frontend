import useGetAllSentInvitations from '@/hooks/useGetAllSentInvitations';
import useDeleteInvite from '@/hooks/useDeleteInvite';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Text, Avatar, Spinner, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useSentInvitations } from '@/context/SentInvitations';
const getSentInvitations = () => {
  const { sentInvitations, loading, getAllSentInvitations, deleteInvitation } =
    useSentInvitations();
  useEffect(() => {
    getAllSentInvitations();
  }, []);
  if (loading) {
    return <Spinner></Spinner>;
  }

  return sentInvitations.map((invitation: any) => (
    <Box
      border={'1px solid teal'}
      borderRadius={'lg'}
      mt={'14px'}
      padding={'6px'}
      key={invitation.invitation_id}
      // overflow={'hidden'}
    >
      <Box display={'flex'}>
        {' '}
        <Avatar src={`${invitation.receiver_profile}`}></Avatar>
        {/* <Avatar src={`${invitation.sender_profile}`}></Avatar> */}
        <Box position={'absolute'} right={'20px'}></Box>
      </Box>

      <Text fontSize={'10px'}>
        {' '}
        Invitation ID: <strong>{invitation.invitation_id}</strong>{' '}
      </Text>
      <Text fontSize={'10px'}>
        {' '}
        receiver: <strong color="teal">
          {invitation.receiver_username}
        </strong>{' '}
      </Text>
      <Box ml={'auto'}>
        <Button onClick={() => deleteInvitation(invitation.invitation_id)}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </Box>
    </Box>
  ));
};
export default getSentInvitations;
