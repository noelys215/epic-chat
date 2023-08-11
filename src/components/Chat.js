import { useRoom } from '@/hooks/useRoom';
import { AddPhotoAlternate, MoreVert } from '@mui/icons-material';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MediaPreview } from './MediaPreview';
import { ChatFooter } from './ChatFooter';
import { nanoid } from 'nanoid';
import { collection, serverTimestamp } from 'firebase/firestore';

export const Chat = ({ user }) => {
	const router = useRouter();
	const roomId = router.query.roomId ?? '';
	const userId = user?.uid;
	const room = useRoom(roomId, userId);
	/* State */
	const [image, setImage] = useState(null);
	const [src, setSrc] = useState('');
	const [input, setInput] = useState('');
	/* Handlers */
	const showPreview = (e) => {
		const file = e.target.files[0];

		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setSrc(reader.result);
			};
		}
	};

	const closePreview = () => {
		setSrc('');
		setImage(null);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		setInput('');
		if (image) closePreview();
		const imageName = nanoid();
		const newMessage = {
			name: user?.displayName,
			message: input,
			uid: user?.uid,
			timestamp: serverTimestamp(),
			time: new Date().toUTCString(),
			...(image ? { imageUrl: 'uploading', imageName } : {}),
		};
		await setDoc(doc(db, `users/${userId}/chats/${roomId}`), {
			name: room?.name,
			photoURL: room?.photoURL || null,
			timestamp: serverTimestamp(),
		});
		await addDoc(collection(db, `rooms/${roomId}/messages`), newMessage);
	};

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
					<input
						id="image"
						style={{ display: 'none' }}
						accept="image/*"
						type="file"
						onChange={showPreview}
					/>
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

			{/* Media Preview */}
			<MediaPreview src={src} closePreview={closePreview} />
			<ChatFooter
				input={input}
				onChange={(e) => setInput(e.target.value)}
				image={image}
				user={user}
				room={room}
				roomId={roomId}
				sendMessage={sendMessage}
			/>
		</div>
	);
};
