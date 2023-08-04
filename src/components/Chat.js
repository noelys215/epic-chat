import { useRoom } from '@/hooks/useRoom';
import { useRouter } from 'next/router';

export const Chat = ({ user }) => {
	const router = useRouter();
	const roomId = router.query.roomId ?? '';
	const userId = user?.uid;
	const room = useRoom(roomId, userId);
	return (
		<div>
			<h1>Chat</h1>
		</div>
	);
};
