import { db } from '@/utils/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

export const useRoom = (roomId, userId) => {
	const isUserRoom = roomId?.includes(userId);
	const collectionId = isUserRoom ? 'users' : 'rooms';
	const docId = isUserRoom ? roomId.replace(userId, '') : roomId;
	const [snapshot] = useDocument(docId ? doc(db, `${collectionId}/${docId}`) : null);

	!snapshot?.exists() && null;

	return {
		id: snapshot?.id,
		photoURL:
			snapshot?.photoURL || `http://avatars.dicebear.com/api/jdenticon/${snapshot?.id}.svg`,
		...snapshot?.data(),
	};
};
