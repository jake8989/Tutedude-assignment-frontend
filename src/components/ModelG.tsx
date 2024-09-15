import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Container,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
} from '@chakra-ui/react';
import { Input, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import useGetUser from '@/hooks/useGetAllUser';
import { Search2Icon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
// interface User {}
import useGetAllSentInvitations from '@/hooks/useGetAllSentInvitations';
import useGetAllreceivedInvitation from '@/hooks/useGetAllreceivedInvitation';
import useCreateInvite from '@/hooks/useCreateInvite';
import SentInvitations from '@/components/sentInvitaions';
import ReceivedInvitations from '@/components/receivedinvitaions';
import { useLogout } from '@/hooks/useLogout';
import ModelG from '@/components/ModelG';
import cookie from 'js-cookie';
import { useUser } from '@/context/UserContext';
interface props {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}
const Model: React.FC<props> = ({ isOpen, onOpen, onClose }) => {
  const router = useRouter();
  const toast = useToast();
  const [counter, setCounter] = useState<number>(0);
  const [serachUser, setsearchUser] = useState<string>('');
  const { user } = useUser();
  let { getUser, loading, ruser } = useGetUser();

  let { logout } = useLogout();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const vl = event.target.value.trim();
    console.log(vl);
    setsearchUser((prevUserName) => vl);
    console.log(serachUser);
  };
  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    if (serachUser.trim() === '') {
      toast({
        title: 'Error',
        description: 'Username Cannot be empty',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    // setsearchUser('');
    await getUser(serachUser);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box
              className="search-func"
              flex={'4'}
              height={'100%'}
              justifyContent={'flex-end'}
              mt={'40px'}
              // background={'orange.400'}
            >
              <Text fontSize={'20px'} textAlign={'center'}>
                Invitaions
              </Text>
              <Container mt={'20px'}>
                <Tabs variant="soft-rounded" colorScheme="green" isFitted>
                  <TabList>
                    <Tab>Sent Invitations</Tab>
                    <Tab>received Invitaions</Tab>
                  </TabList>

                  <TabPanels
                    overflowY={'scroll'}
                    overflowX={'hidden'}
                    height={'400px'}
                  >
                    <TabPanel>
                      <SentInvitations></SentInvitations>
                    </TabPanel>
                    <TabPanel>
                      <ReceivedInvitations
                        key={new Date().getMilliseconds()}
                      ></ReceivedInvitations>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Container>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Model;
