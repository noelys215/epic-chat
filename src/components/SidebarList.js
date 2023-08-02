import { CircularProgress } from '@mui/material';
import { SidebarListItem } from './SidebarListItem';
import { CancelOutlined, SearchOutlined } from '@mui/icons-material';

const NoSearchResults = ({ title }) => {
	return (
		<div className="no-result">
			<div>
				<SearchOutlined />
				<div className="cancel-root">
					<CancelOutlined />
				</div>
			</div>
			<h2>No {title}</h2>
		</div>
	);
};

export const SidebarList = ({ title, data }) => {
	/* Spinner */
	!data && (
		<div className="loader__container sidebar__loader">
			<CircularProgress />
		</div>
	);
	/* No Search Results Image */
	if (!data?.length && title === 'Search Results') return <NoSearchResults title={title} />;

	return (
		<div className="sidebar__chat--container">
			<h2>{title}</h2>
			{data?.map((item) => (
				<SidebarListItem key={item.id} item={item} />
			))}
		</div>
	);
};
