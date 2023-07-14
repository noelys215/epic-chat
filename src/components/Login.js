import { Button } from '@mui/material';

export const Login = () => {
	return (
		<div className="app">
			<div className="login">
				<div className="login__backgroud" />
				<div className="login__container">
					<img src="/logo.png" alt="logo" />
					<div className="login__text">
						<h1>Sign in to Epic Chat</h1>
					</div>
					<Button>Sign in with Google</Button>
				</div>
			</div>
		</div>
	);
};
