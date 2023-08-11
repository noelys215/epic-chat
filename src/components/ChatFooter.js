import { CancelRounded, CheckCircleRounded, MicRounded, Send } from '@mui/icons-material';

export const ChatFooter = ({ input, onChange, image, user, room, roomId, sendMessage }) => {
	const canRecord = true;
	const isRecording = true;
	const canSendMessage = input.trim() || (input === '' && image);
	const recordIcons = (
		<>
			<Send sx={{ width: 20, height: 20, color: 'white' }} />
			<MicRounded sx={{ width: 24, height: 24, color: 'white' }} />
		</>
	);
	return (
		<div className="chat__footer">
			<form>
				<input
					value={input}
					onChange={onChange}
					placeholder="Type a message"
					style={{
						width: isRecording ? 'calc(100% - 20px)' : 'calc(100% - 112px)',
					}}
				/>
				{canRecord ? (
					<button
						onClick={canSendMessage ? sendMessage : () => null}
						type="submit"
						className="send__btn">
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

			{isRecording && (
				<div className="record">
					<CancelRounded style={{ width: 30, height: 30, color: '#f20519' }} />
					<div>
						<div className="record__redcircle" />
						<div className="record__duration">0:00</div>
					</div>
					<CheckCircleRounded style={{ width: 30, height: 30, color: '#41bf49' }} />
				</div>
			)}
		</div>
	);
};
