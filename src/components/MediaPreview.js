import { CloseRounded } from '@mui/icons-material';

export const MediaPreview = ({ src, closePreview }) => {
	if (!src) return null;

	return (
		<div className="mediaPreview">
			<CloseRounded onClick={closePreview} />
			<img src={src} alt="Preview" />
		</div>
	);
};
