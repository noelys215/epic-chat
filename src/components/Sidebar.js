import { ExitToApp } from '@mui/icons-material';
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
		</div>
	);
};
