// src/context/SentInvitationsContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { body } from 'framer-motion/client';
import { useToast } from '@chakra-ui/react';
import useGetFriends from '@/hooks/useGetFriends';
interface Invitation {
  invitation_id: string;
  receiver_username: string;
  receiver_profile: string;
}
interface ReceivedInvitation {
  invitation_id: string;
  sender_username: string;
  sender_profile: string;
}

interface InvitationsContextType {
  sentInvitations: Invitation[];
  receivedInvitations: ReceivedInvitation[];
  loading: boolean;
  getAllSentInvitations: () => Promise<void>;
  getAllReceivedInvitations: () => Promise<void>;
  deleteInvitation: (invitationId: string) => void;
  acceptInvitation: (invitationId: string) => void;
}

const InvitationsContext = createContext<InvitationsContextType | undefined>(
  undefined,
);

export const InvitationsProvider = ({ children }: { children: ReactNode }) => {
  const { getFriends } = useGetFriends();
  const [sentInvitations, setSentInvitations] = useState<Invitation[]>([]);
  const [receivedInvitations, setReceivedInvitations] = useState<
    ReceivedInvitation[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const getAllSentInvitations = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<Invitation[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/all-sent-requests`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      );
      setSentInvitations(response.data);
      console.log(sentInvitations);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllReceivedInvitations = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<ReceivedInvitation[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/all-received-requests`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      );
      setReceivedInvitations(response.data);
      console.log(receivedInvitations);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  };
  const acceptInvitation = async (invitation_id: string) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/accept-invite`,
        { invitation_id: invitation_id },
        {
          headers: {
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setReceivedInvitations((prevInvitations) =>
          prevInvitations.filter(
            (invitation) => invitation.invitation_id !== invitation_id,
          ),
        );

        setLoading(false);
        // console.log(response.data);
        toast({
          title: 'Adding...',
          description: 'You are now friends',
          duration: 2000,
          status: 'info',
        });
      })
      .catch((err: any) => {
        setLoading(false);
        toast({
          title: 'Error',
          description: `${err.response?.data.message}`,
          duration: 2000,
          status: 'error',
        });
        // console.log(err.response.data);
      });
  };
  const deleteInvitation = async (invitation_id: string) => {
    try {
      setLoading(true);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/invitations/delete-invitation`,
          { invitation_id: invitation_id },
          {
            headers: {
              Authorization: `Bearer ${cookie.get('token')}`,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setSentInvitations((prevInvitations) =>
            prevInvitations.filter(
              (invitation) => invitation.invitation_id !== invitation_id,
            ),
          );
          setReceivedInvitations((prevInvitations) =>
            prevInvitations.filter(
              (invitation) => invitation.invitation_id !== invitation_id,
            ),
          );
          setLoading(false);
          toast({
            title: 'Success',
            status: 'info',
            description: 'invitation deleted succesfully!',
          });
        })
        .catch((error: any) => {
          console.log(error);

          setLoading(false);
        });
    } catch (error) {
      console.error('Error deleting invitation:', error);
    }
  };

  return (
    <InvitationsContext.Provider
      value={{
        sentInvitations,
        receivedInvitations,
        loading,
        getAllSentInvitations,
        getAllReceivedInvitations,
        deleteInvitation,
        acceptInvitation,
      }}
    >
      {children}
    </InvitationsContext.Provider>
  );
};

export const useSentInvitations = () => {
  const context = useContext(InvitationsContext);
  if (!context) {
    throw new Error(
      'useSentInvitations must be used within a SentInvitationsProvider',
    );
  }
  return context;
};
