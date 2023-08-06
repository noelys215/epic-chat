import { useRoom } from '@/hooks/useRoom';
import { AddPhotoAlternate, MoreVert } from '@mui/icons-material';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

export const Chat = ({ user }) => {
	const router = useRouter();
	const roomId = router.query.roomId ?? '';
	const userId = user?.uid;
	const room = useRoom(roomId, userId);

	!room && null;
	return (
		<div className="chat">
			<div className="chat__background" />
			{/* Chat Header */}
			<div className="chat__header">
				<div className="avatar__container">
					<Avatar src={room?.photoURL} alt={room?.name} />
				</div>
				<div className="chat__header--info">
					<h3>{room?.name}</h3>
				</div>
				<div className="chat__header--right">
					<input id="image" style={{ display: 'none' }} accept="image/*" type="file" />
					<IconButton>
						<label style={{ cursor: 'pointer', height: 24 }} htmlFor="image">
							<AddPhotoAlternate />
						</label>
					</IconButton>

					<IconButton>
						<MoreVert />
					</IconButton>

					<Menu id="menu" keepMounted>
						<MenuItem>Delete Room</MenuItem>
					</Menu>
				</div>
			</div>
		</div>
	);
};
