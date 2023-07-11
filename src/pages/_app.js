import '@/styles/globals.css';
import { Spectral } from 'next/font/google';

const spectral = Spectral({ subsets: ['latin'], weight: ['200', '300', '400', '500'] });

export default function App({ Component, pageProps }) {
	return (
		<main className={spectral.className}>
			<Component {...pageProps} />
		</main>
	);
}
