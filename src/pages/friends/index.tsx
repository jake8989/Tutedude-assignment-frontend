import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import {
  Heading,
  Box,
  Text,
  Container,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Avatar,
  useDisclosure,
} from '@chakra-ui/react';
import { Input, Button } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import useGetUser from '@/hooks/useGetAllUser';
import { Spinner } from '@chakra-ui/react';
import useGetFriends from '@/hooks/useGetFriends';
import { useLogout } from '@/hooks/useLogout';
import ModelG from '@/components/ModelG';
import cookie from 'js-cookie';
import { CloseIcon } from '@chakra-ui/icons';
import useCreateInvite from '@/hooks/useCreateInvite';
export default function friends() {
  const router = useRouter();
  const toast = useToast();
  const [counter, setCounter] = useState<number>(0);
  const [serachUser, setsearchUser] = useState<string>('');
  const { user } = useUser();
  let { getUser, loading, ruser } = useGetUser();

  let { logout } = useLogout();
  useEffect(() => {
    const url = cookie.get('user_step');
    if (url) {
      router.push(url);
    } else {
      toast({
        title: 'Error',
        description: `User Not Logged In`,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      // router.push('/');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const vl = event.target.value.trim();
    // console.log(vl);
    setsearchUser((prevUserName) => vl);
    // console.log(serachUser);
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
  const { getFriends, setUsersFriends, usersFriends, unfriendUser } =
    useGetFriends();
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (
      !window?.localStorage.getItem('user') ||
      !cookie.get('user_id') ||
      !cookie.get('token')
    ) {
      toast({
        title: 'Error',
        description: 'Login/Signup required!',
        isClosable: true,
        duration: 2000,
        status: 'error',
      });
      router.push('/');
    }
  }, []);
  useEffect(() => {
    getFriends();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createInvite, loadingI } = useCreateInvite();
  const createInvitation = async () => {
    await createInvite(ruser._id);
    ruser._id = '';
    ruser.email = '';
    ruser.username = '';
    ruser.profile = '';
    setsearchUser('');
  };
  return (
    <>
      <Heading textAlign={'center'} mt={'70px'}>
        Dude's
        {/* <Box> */}
        <Box position={'absolute'} right={'10px'}>
          <Avatar
            mr={'10px'}
            src={user?.profile}
            // boxSize={'0px'}
            // borderRadius={'full'}
          ></Avatar>
          <Button colorScheme="teal" onClick={onOpen}>
            Invitations
          </Button>
          <Button ml={'10px'} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        {/* </Box> */}
      </Heading>
      <ModelG isOpen={isOpen} onOpen={onOpen} onClose={onClose}></ModelG>
      <Box
        className="container"
        display={'flex'}
        padding={'20px'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        mt={'100px'}
      >
        <Box
          className="search-func"
          flex={'4'}
          // width={'45%'}
          height={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          // background={'orange.400'}
        >
          <Text mt={'40px'} fontSize={'20px'}>
            Search User With Username
          </Text>
          <Box
            mt={'40px'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            // width={'100%'}
            // as="form"
          >
            <Input
              placeholder="search user..."
              onChange={handleChange}
              value={serachUser}
              name="input-user"
              type="text"
            ></Input>
            <Button ml={'10px'} onClick={handleClick}>
              Search
            </Button>
          </Box>
          <Box
            className="Showing User"
            // width={'60%'}
            // background={'teal'}
            // border={'1px solid black'}
            borderRadius={'lg'}
            mt={'40px'}
          >
            {loading || loadingI ? (
              <Spinner></Spinner>
            ) : (
              <Box>
                {ruser._id && (
                  <Box
                    // height={'50px'}
                    padding={'5px'}
                    display={'flex'}
                    flexDirection={'row'}
                    border={'0.5px solid teal'}
                    borderRadius={'lg'}
                  >
                    <Avatar
                      src={ruser.profile}
                      // boxSize={'0px'}
                      // borderRadius={'full'}
                    ></Avatar>
                    <Heading
                      fontSize={'20px'}
                      // textAlign={'center'}
                      padding={'5px'}
                    >
                      {ruser.username}
                      <Text padding={'2px'} fontSize={'9px'}>
                        Email :{ruser.email}
                      </Text>
                    </Heading>
                    <Box display={'flex'}>
                      <Button
                        colorScheme={'teal'}
                        onClick={createInvitation}
                        isLoading={Boolean(loadingI)}
                      >
                        Send Invite{' '}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          className="search-func"
          // flex={'-1'}
          // maxWidth={'50%'}
          flex={'5'}
          // height={'100%'}
          mt={'40px'}

          // background={'orange.400'}
        >
          <Text fontSize={'20px'} textAlign={'center'}>
            Your Friends
          </Text>
          <Container mt={'20px'}>
            {usersFriends.length > 0 &&
              usersFriends[0]._id !== '' &&
              usersFriends.map((user) => (
                <Box
                  // height={'50px'}
                  padding={'5px'}
                  display={'flex'}
                  flexDirection={'row'}
                  border={'0.5px solid teal'}
                  borderRadius={'lg'}
                  mt={'10px'}
                  key={user.friendUsername}
                >
                  <Avatar
                    src={user.friendProfile}
                    // boxSize={'0px'}
                    // borderRadius={'full'}
                  ></Avatar>
                  <Heading fontSize={'20px'} padding={'5px'}>
                    {user.friendUsername}
                    <Text padding={'2px'} fontSize={'9px'}>
                      Email :{user.friendEmail}
                    </Text>
                  </Heading>
                  <Box display={'flex'} marginLeft={'auto'}>
                    <Button
                      colorScheme={'red'}
                      onClick={() => unfriendUser(user._id)}
                      // onClick={getListAndCreateInvitaion}
                      // isLoading={Boolean(loadingI)}
                    >
                      Unfriend
                    </Button>
                  </Box>
                </Box>
              ))}
          </Container>
        </Box>
      </Box>
    </>
  );
}
