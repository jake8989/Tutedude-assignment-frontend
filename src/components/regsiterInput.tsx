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
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { set } from 'mongoose';
import { useRegister } from '@/hooks/useRegister';
interface formInput {
	user: {
		username: string;
		email: string;
		password: string;
		confirmpassword: string;
	};
}
export default function Register() {
	const router = useRouter();
	const { register, loading, error } = useRegister();
	const toast = useToast();
	const [formData, setFormData] = useState<formInput>({
		user: {
			username: '',
			email: '',
			password: '',
			confirmpassword: '',
		},
	});
	const handleSubmit = async (event: any) => {
		// event.preventDefault();
		console.log('Hii');
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
			formData.user.email.trim() === '' ||
			!formData.user.email.trim().includes('@') ||
			!formData.user.email.trim().includes('.')
		) {
			toast({
				title: 'Email',
				description: 'Invalid Email',
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

		if (
			formData.user.password.trim() !== formData.user.confirmpassword.trim()
		) {
			toast({
				title: 'Password',
				description: 'Password and Confirm password not matching',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		console.log(formData);
		await register(formData.user);
	};
	const handleChange = (event: any): void => {
		event.preventDefault();
		console.log('DP');
		setFormData({
			user: { ...formData.user, [event.target.name]: event.target.value },
		});
	};
	return (
		<form action="">
			<Container maxW="container.sm">
				<Box>
					<Stack spacing={4}>
						<InputGroup>
							<Input
								name="username"
								placeholder="Username"
								value={formData.user.username}
								// required={true}
								onChange={handleChange}
								isRequired={true}
							/>
						</InputGroup>

						<InputGroup>
							<Input
								name="email"
								placeholder="Email"
								value={formData.user.email}
								// required={true}
								onChange={handleChange}
								isRequired={true}
							/>
						</InputGroup>
						<InputGroup>
							<Input
								name="password"
								placeholder="Password"
								value={formData.user.password}
								// required={true}
								onChange={handleChange}
								isRequired={true}
							/>
						</InputGroup>
						<InputGroup>
							<Input
								name="confirmpassword"
								placeholder="Confirm Password"
								value={formData.user.confirmpassword}
								// required={true}
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
						loadingText={'submitting...'}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Container>
			</Container>
		</form>
	);
}
