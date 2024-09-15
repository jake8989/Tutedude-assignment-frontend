import {
	Box,
	Container,
	Stack,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
	Button,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useLogin } from '@/hooks/useLogin';
interface formInput {
	user: { username: string; password: string };
}
export default function Login() {
	const router = useRouter();
	const toast = useToast();
	const { login, loading } = useLogin();
	const [formData, setFormData] = useState<formInput>({
		user: {
			username: '',
			password: '',
		},
	});
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (formData.user.username.trim() === '') {
			// alert('User name cannot be empty');
			toast({
				title: 'username',
				description: 'username cannot be empty',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		if (
			formData.user.password.trim() === '' ||
			formData.user.password.trim().length < 6
		) {
			// alert('password length should be 6');
			toast({
				title: 'Password',
				description: 'min length of the password should be 6',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		console.log(formData.user);
		await login(formData.user);
		// console.log(loading);
		// if (!loading) {
		// 	if (error) {
		// 		toast({
		// 			title: 'Error',
		// 			description: `${successMessage}`,
		// 			status: 'error',
		// 			duration: 2000,
		// 			isClosable: true,
		// 		});
		// 	}
		// 	if (!error) {
		// 		toast({
		// 			title: 'Success',
		// 			description: `${successMessage}`,
		// 			status: 'success',
		// 			duration: 2000,
		// 			isClosable: true,
		// 		});
		// 	}
		// }
	};
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		console.log('dp');
		setFormData({
			user: { ...formData.user, [event.target.name]: event.target.value },
		});
	};
	return (
		<form action="" id="form-data">
			<Container maxW="container.sm">
				<Box>
					<Stack spacing={4}>
						<InputGroup>
							<Input
								name="username"
								placeholder="Username"
								value={formData.user.username}
								required={true}
								onChange={handleChange}
								isRequired={true}
							/>
						</InputGroup>

						<InputGroup>
							<Input
								required
								type="password"
								name="password"
								placeholder="Password"
								value={formData.user.password}
								onChange={handleChange}
								isRequired={true}
							/>
						</InputGroup>
					</Stack>
				</Box>
				<Container>
					<Button
						mt={10}
						width={'100%'}
						colorScheme="teal"
						isLoading={Boolean(loading)}
						onClick={handleSubmit}
						loadingText={'Logging...'}
					>
						Login
					</Button>
				</Container>
			</Container>
		</form>
	);
}
