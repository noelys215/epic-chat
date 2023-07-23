import { Add, ExitToApp, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';

export const Sidebar = ({ user }) => {
	return (
		<div className="sidebar">
			{/* Header */}
			<div className="sidebar__header">
				<div className="sidebar__header--left">
					<Avatar src={user?.photoUrl} alt={user?.displayName} />
					<h4>{user?.displayName}</h4>
				</div>
				<div className="sidebar__header--right">
					<IconButton>
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
			{/* Create Room Button */}
			<div className="sidebar__chat--addRoom">
				<IconButton>
					<Add />
				</IconButton>
			</div>
		</div>
	);
};
