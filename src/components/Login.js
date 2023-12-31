import { auth } from '@/utils/firebase';
import { Button } from '@mui/material';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

export const Login = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	return (
		<div className="app">
			<div className="login">
				<div className="login__backgroud" />
				<div className="login__container">
					<img src="/logo.png" alt="logo" />
					<div className="login__text">
						<h1>Sign in to Epic Chat</h1>
					</div>
					<Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>
				</div>
			</div>
		</div>
	);
};
