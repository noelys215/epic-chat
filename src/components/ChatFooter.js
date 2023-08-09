import { MicRounded, Send } from '@mui/icons-material';

export const ChatFooter = () => {
	const canRecord = true;
	const recordIcons = (
		<>
			<Send sx={{ width: 20, height: 20, color: 'white' }} />
			<MicRounded sx={{ width: 24, height: 24, color: 'white' }} />
		</>
	);
	return (
		<div className="chat__footer">
			<form>
				<input placeholder="Type a message" />
				{canRecord ? (
					<button type="submit" className="send__btn">
						{recordIcons}
					</button>
				) : (
					<>
						<label htmlFor="capture" className="send__btn">
							{recordIcons}
						</label>
						<input
							style={{ display: none }}
							type="file"
							id="capture"
							accept="audio/*"
							capture
						/>
					</>
				)}
			</form>
		</div>
	);
};
