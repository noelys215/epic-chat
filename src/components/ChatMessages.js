import { CircularProgress } from '@mui/material';

export default function ChatMessages({ messages, user, roomId }) {
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
					<div />
				) : (
					<span className="chat__message--message">{msg?.message}</span>
				)}

				<span className="chat__timestamp">{msg?.time}</span>
			</div>
		);
	});
}
