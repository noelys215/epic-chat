import { db } from '@/utils/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useUsers = (user) => {
	const [snapshot] = useCollection(query(collection(db, 'users'), orderBy('timestamp', 'desc')));
	const users = [];

	snapshot?.docs.forEach((doc) => {
		const id = doc?.id > user?.uid ? `${doc?.id}${user?.uid}` : `${doc?.uid}${user?.id}`;
		if (doc?.id !== user?.uid) users.push({ id, ...doc?.data() });
	});

	return users;
};
