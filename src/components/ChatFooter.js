import recordAudio from '@/utils/recordAudio';
import { CancelRounded, CheckCircleRounded, MicRounded, Send } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

export const ChatFooter = ({
	input,
	onChange,
	image,
	user,
	room,
	roomId,
	sendMessage,
	setAudioId,
}) => {
	const record = useRef();
	const [duration, setDuration] = useState('00:00');
	const timerInterval = useRef();
	const canRecord = !!navigator.mediaDevices.getUserMedia && !!window.MediaRecorder;
	const [isRecording, setIsRecording] = useState(false);
	const canSendMessage = input.trim() || (input === '' && image);
	const recordIcons = (
		<>
			<Send sx={{ width: 20, height: 20, color: 'white' }} />
			<MicRounded sx={{ width: 24, height: 24, color: 'white' }} />
		</>
	);

	useEffect(
		function () {
			if (isRecording) {
				record.current.start();
				startTimer();
			}

			const pad = (val) => (String(val).length < 2 ? `0${val}` : val);

			function startTimer() {
				const start = Date.now();
				timerInterval.current = setInterval(setTime, 100);

				function setTime() {
					const timeElapsed = Date.now() - start;
					const totalSeconds = Math.floor(timeElapsed / 1000);
					const minutes = pad(parseInt(totalSeconds / 60));
					const seconds = pad(parseInt(totalSeconds % 60));
					const duration = `${minutes}:${seconds}`;
					setDuration(duration);
				}
			}
		},
		[isRecording]
	);

	const startRecording = async (e) => {
		e.preventDefault();
		record.current = await recordAudio();
		setIsRecording(true);
		setAudioId('');
	};

	const stopRecording = () => {
		clearInterval(timerInterval.current);
		setIsRecording(false);
		record.current.stop();
		setDuration('00:00');
	};

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
						onClick={canSendMessage ? sendMessage : startRecording}
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
					<CancelRounded
						onClick={stopRecording}
						style={{ width: 30, height: 30, color: '#f20519' }}
					/>
					<div>
						<div className="record__redcircle" />
						<div className="record__duration">{duration}</div>
					</div>
					<CheckCircleRounded style={{ width: 30, height: 30, color: '#41bf49' }} />
				</div>
			)}
		</div>
	);
};
