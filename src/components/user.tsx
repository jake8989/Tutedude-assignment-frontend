import { Container, Box } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from './loginInput';
import Register from './regsiterInput';
export default function User() {
	return (
		<>
			<Container>
				<Tabs variant="soft-rounded" colorScheme="green" isFitted>
					<TabList>
						<Tab>Register</Tab>
						<Tab>Login</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							{/* <p>one!</p> */}
							<Register></Register>
						</TabPanel>
						<TabPanel>
							{/* <p>two!</p> */}
							<Login></Login>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</>
	);
}
