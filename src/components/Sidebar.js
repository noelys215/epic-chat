import { Add, ExitToApp, Home, Message, PeopleAlt, SearchOutlined } from '@mui/icons-material';
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { SidebarTab } from './SidebarTab';
import { SidebarList } from './SidebarList';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useRooms } from '@/hooks/useRooms';

export const Sidebar = ({ user }) => {
	const [menu, setMenu] = useState(1);
	const [isCreatingRoom, setIsCreatingRoom] = useState(false);
	const [roomName, setRoomName] = useState('');
	const router = useRouter();
	const rooms = useRooms();

	const tabs = [
		{
			id: 1,
			icon: <Home />,
		},
		{
			id: 2,
			icon: <Message />,
		},
		{
			id: 3,
			icon: <PeopleAlt />,
		},
	];
	/* Dummy Data */
	const data = [
		{
			id: 1,
			name: 'Asuka Langley',
			photoUrl:
				'https://64.media.tumblr.com/b2702aa3e90fff9aecb3b01aec84bb83/e921c896b0f8c28a-95/s1280x1920/38b49fedca9250ba1f9ac1184fdb165b20d1e7ce.png',
		},
	];

	const createRoom = async () => {
		if (roomName?.trim) {
			const roomsRef = collection(db, 'rooms');
			const newRoom = await addDoc(roomsRef, {
				name: roomName,
				timestamp: serverTimestamp(),
			});
			setIsCreatingRoom(false);
			setRoomName('');
			setMenu(2);
			router.push(`/?roomId=${newRoom?.id}`);
		}
	};

	return (
		<div className="sidebar">
			{/* Header */}
			<div className="sidebar__header">
				<div className="sidebar__header--left">
					<Avatar src={user?.photoUrl} alt={user?.displayName} />
					<h4>{user?.displayName}</h4>
				</div>
				<div className="sidebar__header--right">
					<IconButton onClick={() => auth.signOut()}>
						<ExitToApp />
					</IconButton>
				</div>
			</div>
			{/* Search */}
			<div className="sidebar__search">
				<form className="sidebar__search--container">
					<SearchOutlined />
					<input type="text" placeholder="Search for users or rooms..." id="search" />
				</form>
			</div>
			{/* SideBar */}
			<div className="sidebar__menu">
				{tabs.map((tab) => (
					<SidebarTab
						key={tab.id}
						onClick={() => setMenu(tab.id)}
						isActive={tab?.id === menu}>
						<div className="sidebar__menu--home">
							{tab?.icon}
							<div className="sidebar__menu--line" />
						</div>
					</SidebarTab>
				))}
			</div>

			{menu === 1 ? (
				<SidebarList title="Chats" data={data} />
			) : menu === 2 ? (
				<SidebarList title="Rooms" data={rooms} />
			) : menu === 3 ? (
				<SidebarList title="Users" data={data} />
			) : menu === 4 ? (
				<SidebarList title="Search Results" data={data} />
			) : null}

			{/* Create Room Button */}
			<div className="sidebar__chat--addRoom">
				<IconButton onClick={() => setIsCreatingRoom(true)}>
					<Add />
				</IconButton>
			</div>

			{/* Dialog */}
			<Dialog open={isCreatingRoom} maxWidth="sm" onClose={() => setIsCreatingRoom(false)}>
				<DialogTitle sx={{ font: 'inherit', textAlign: 'center' }}>
					Create New Room
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ font: 'inherit' }}>
						Type the name of your public room; any users may join.
					</DialogContentText>
					<TextField
						onChange={(e) => setRoomName(e.target.value)}
						value={roomName}
						autoFocus
						margin="dense"
						id={roomName}
						label="Room Name"
						type="text"
						fullWidth
						variant="filled"
						style={{ font: 'inherit', marginTop: 20 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setIsCreatingRoom(false)}
						sx={{ font: 'inherit', fontWeight: 'bold' }}
						color="error">
						CANCEL
					</Button>
					<Button
						onClick={createRoom}
						sx={{ font: 'inherit', fontWeight: 'bold' }}
						color="success">
						SUBMIT
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
