import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { Toast } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Heading, Button, Box } from '@chakra-ui/react';
function Dashboard() {
  const { user, loginUser, logoutUser } = useUser();
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    console.log(user);
    if (!user) {
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
  return (
    <>
      <Heading textAlign={'center'} mt={'30px'}>
        Dude's
        {/* <Box> */}
        <Box position={'absolute'} right={'10px'}>
          <Button
            colorScheme="teal"
            onClick={() => router.push('/chat/friends')}
          >
            Go To Friends
          </Button>
          <Button ml={'10px'} colorScheme="blue" style={{ cursor: 'none' }}>
            {'User Name'}
          </Button>
          <Button ml={'10px'}>Logout</Button>
        </Box>
        {/* </Box> */}
      </Heading>
    </>
  );
}

export default Dashboard;
