import { CircularProgress } from '@chakra-ui/react';

export default function LoadingScreen() {
	return (
		<main
			style={{
				width: '100vw',
				height: '100vh',
				zIndex: '10',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress isIndeterminate color="teal"></CircularProgress>
		</main>
	);
}
