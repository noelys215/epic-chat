import { db, storage } from '@/utils/firebase';
import recordAudio from '@/utils/recordAudio';
import { CancelRounded, CheckCircleRounded, MicRounded, Send } from '@mui/icons-material';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
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

	const stopRecording = async () => {
		clearInterval(timerInterval.current);
		setIsRecording(false);
		const audio = await record.current.stop();
		setDuration('00:00');
		return audio;
	};

	async function finishRecording() {
		const audio = await stopRecording();
		sendAudio(({ audioFile, audioName } = await audio));
	}

	async function sendAudio(audioFile, audioName) {
		await setDoc(doc(db, `users/${user.uid}/chats/${roomId}`), {
			name: room?.name,
			photoURL: room?.photoURL || null,
			timestamp: serverTimestamp(),
		});
		const newDoc = await addDoc(collection(db, `rooms/${roomId}/messages`), {
			name: user?.displayName,
			uid: user?.uid,
			timestamp: serverTimestamp(),
			time: new Date().toUTCString(),
			audioUrl: 'uploading',
			audioName,
		});
		await uploadBytes(ref(storage, `audio/${audioName}`), audioFile);
		const url = await getDownloadURL(ref(storage, `audio/${audioName}`));
		await updateDoc(
			doc(db, `rooms/${roomId}/messages/${newDoc.id}`, {
				audioUrl: url,
			})
		);
	}

	function audioInputChange(e) {
		const audioFile = e.target.files[0];
		const audioName = nanoid();

		if (audioFile) {
			setAudioId('');
			sendAudio(audioFile, audioName);
		}
	}

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
							onChange={audioInputChange}
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
