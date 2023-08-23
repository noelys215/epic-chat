import { useRoom } from '@/hooks/useRoom';
import { AddPhotoAlternate, MoreVert } from '@mui/icons-material';
import { Avatar, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MediaPreview } from './MediaPreview';
import { ChatFooter } from './ChatFooter';
import { nanoid } from 'nanoid';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import Compressor from 'compressorjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/utils/firebase';
import { useChatMessages } from '@/hooks/useChatMessages';
import ChatMessages from './ChatMessages';

export const Chat = ({ user }) => {
	console.log(user);
	const router = useRouter();
	const roomId = router.query.roomId ?? '';
	const userId = user?.uid;
	const room = useRoom(roomId, userId);
	const messages = useChatMessages(roomId);
	/* State */
	const [image, setImage] = useState(null);
	const [src, setSrc] = useState('');
	const [input, setInput] = useState('');
	const [audioId, setAudioId] = useState('');
	//
	const [openMenu, setOpenMenu] = useState(null);
	const [isDeleting, setIsDeleting] = useState(null);

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
		await setDoc(doc(db, `users/${userId}/chats/${roomId}`), {
			name: room?.name,
			photoURL: room?.photoURL || null,
			timestamp: serverTimestamp(),
		});
		const newDoc = await addDoc(collection(db, `rooms/${roomId}/messages`), {
			name: user?.displayName,
			message: input,
			uid: user?.uid,
			timestamp: serverTimestamp(),
			time: new Date().toUTCString(),
			...(image ? { imageUrl: 'uploading', imageName } : {}),
		});

		if (image) {
			new Compressor(image, {
				quality: 0.8,
				maxWidth: 1920,
				async success(res) {
					setSrc('');
					setImage(null);
					await uploadBytes(ref(storage, `images/${imageName}`), res);
					const url = await getDownloadURL(ref(storage, `images/${imageName}`));
					await updateDoc(doc(db, `rooms/${roomId}/messages/${newDoc.id}`), {
						imageUrl: url,
					});
				},
			});
		}
	};
	const deleteRoom = async () => {
		setOpenMenu(null);
		setIsDeleting(true);

		try {
			const userChatsRef = doc(db, `users/${userId}/chats/${roomId}`);
			const roomRef = doc(db, `rooms/${roomId}`);
			const roomMessagesRef = collection(db, `rooms/${roomId}/messages`);
		} catch (err) {
			console.error(`Error deleting room: ${err}`);
		} finally {
			setIsDeleting(false);
		}
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

					<IconButton onClick={(e) => setOpenMenu(e.currentTarget)}>
						<MoreVert />
					</IconButton>

					<Menu
						id="menu"
						keepMounted
						anchorEl={openMenu}
						open={!!openMenu}
						onClose={() => setOpenMenu(null)}>
						<MenuItem onClick={deleteRoom}>Delete Room</MenuItem>
					</Menu>
				</div>
			</div>
			<div className="chat__body--container">
				<div className="chat__body">
					<ChatMessages
						messages={messages}
						user={user}
						roomId={roomId}
						audioId={audioId}
						setAudioId={setAudioId}
					/>
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
				setAudioId={setAudioId}
			/>
			{isDeleting && (
				<div className="chat__deleting">
					<CircularProgress />
				</div>
			)}
		</div>
	);
};
