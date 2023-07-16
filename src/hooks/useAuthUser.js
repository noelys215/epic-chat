import { auth } from '@/utils/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useAuthUser = () => {
	const [user] = useAuthState(auth);
	useEffect(() => {
		console.log(user);
	}, [user]);

	return user;
};
