// contexts/UserContext.tsx
import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';

interface User {
	message: string;
	token: string;
	user: string;
	step: string;
}

interface UserContextProps {
	user: User | null;
	loginUser: (user: User) => void;
	logoutUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const loginUser = (newUser: User) => {
		setUser(newUser);
		localStorage.setItem('user', JSON.stringify(newUser));
	};

	const logoutUser = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<UserContext.Provider value={{ user, loginUser, logoutUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
