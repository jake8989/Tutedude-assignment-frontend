import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Text, Avatar, Spinner, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useSentInvitations } from '@/context/Invitations';
import { Router, useRouter } from 'next/router';
import { useRef } from 'react';
const ReceivedInvitations = () => {
  const router = useRouter();
  const {
    loading,
    loadingR,

    receivedInvitations,
    getAllReceivedInvitations,
    deleteInvitation,
    acceptInvitation,
  } = useSentInvitations();

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current) {
      const fetchInvitations = async () => {
        await getAllReceivedInvitations();
        fetchedRef.current = true;
      };
      fetchInvitations();
    }
  }, []);
  if (loadingR) {
    return <Spinner></Spinner>;
  }

  return receivedInvitations.map((invitation: any) => (
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
            onClick={() => acceptInvitation(invitation.invitation_id)}
            isLoading={Boolean(loadingR)}
          >
            Accept
          </Button>
          <Button
            m={'4px'}
            colorScheme="red"
            isLoading={Boolean(loadingR)}
            onClick={() => deleteInvitation(invitation.invitation_id)}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </Box>
      </Box>
    </Box>
  ));
};
export default ReceivedInvitations;
