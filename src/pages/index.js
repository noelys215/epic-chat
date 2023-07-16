import { Login } from '@/components/Login';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function Home() {
	useAuthUser();
	return (
		<>
			<Login />
		</>
	);
}
