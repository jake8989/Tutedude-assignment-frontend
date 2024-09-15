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
interface Invitation {
  invitation_id: string;
  receiver_username: string;
  receiver_profile: string;
}

interface SentInvitationsContextType {
  sentInvitations: Invitation[];
  loading: boolean;
  getAllSentInvitations: () => Promise<void>;
  deleteInvitation: (invitationId: string) => void;
}

const SentInvitationsContext = createContext<
  SentInvitationsContextType | undefined
>(undefined);

export const SentInvitationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sentInvitations, setSentInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    localStorage.setItem('sentInvitations', JSON.stringify(sentInvitations));
  }, []);

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
    <SentInvitationsContext.Provider
      value={{
        sentInvitations,
        loading,
        getAllSentInvitations,
        deleteInvitation,
      }}
    >
      {children}
    </SentInvitationsContext.Provider>
  );
};

export const useSentInvitations = () => {
  const context = useContext(SentInvitationsContext);
  if (!context) {
    throw new Error(
      'useSentInvitations must be used within a SentInvitationsProvider',
    );
  }
  return context;
};
