import { CircularProgress } from '@mui/material';
import { SidebarListItem } from './SidebarListItem';

export const SidebarList = ({ title, data }) => {
	/* Spinner */
	!data && (
		<div className="loader__container sidebar__loader">
			<CircularProgress />
		</div>
	);

	return (
		<div className="sidebar__chat--container">
			<h2>{title}</h2>
			{data?.map((item) => (
				<SidebarListItem key={item.id} item={item} />
			))}
		</div>
	);
};
