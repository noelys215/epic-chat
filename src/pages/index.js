import { Chat } from '@/components/Chat';
import { Login } from '@/components/Login';
import { Sidebar } from '@/components/Sidebar';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function Home() {
	const user = useAuthUser();
	!user && <Login />;

	return (
		<div className="app">
			<div className="app__body">
				<Sidebar user={user} />
				<Chat user={user} />
			</div>
		</div>
	);
}
