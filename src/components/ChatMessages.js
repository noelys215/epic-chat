import { CircularProgress } from '@mui/material';
import AudioPlayer from './AudioPlayer';

export default function ChatMessages({ messages, user, roomId, audioId, setAudioId }) {
	if (!messages) return null;

	return messages.map((msg) => {
		const isSender = msg?.uid === user?.uid;

		return (
			<div
				key={msg?.id}
				className={`chat__message ${isSender ? 'chat__message--sender' : ''}`}>
				<span className="chat__name">{msg?.name}</span>

				{msg?.imageUrl === 'uploading' ? (
					<div className="image-container">
						<div className="image__container--loader">
							<CircularProgress style={{ width: 40, height: 40 }} />
						</div>
					</div>
				) : msg?.imageUrl ? (
					<div className="image-container">
						<img src={msg?.imageUrl} alt={msg?.name} />
					</div>
				) : null}

				{msg?.audioName ? (
					<AudioPlayer
						sender={isSender}
						roomId={roomId}
						id={messages?.id}
						audioUrl={messages?.audioUrl}
						audioId={audioId}
						setAudioId={setAudioId}
					/>
				) : (
					<span className="chat__message--message">{msg?.message}</span>
				)}

				<span className="chat__timestamp">{msg?.time}</span>
			</div>
		);
	});
}
