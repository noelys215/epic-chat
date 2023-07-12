import '@/styles/globals.css';
import { Spectral } from 'next/font/google';
import Head from 'next/head';

const spectral = Spectral({ subsets: ['latin'], weight: ['200', '300', '400', '500'] });

export default function App({ Component, pageProps }) {
	return (
		<main className={spectral.className}>
			<Head>
				<title>Epic Chat</title>
				<link rel="icon" type="image/x-icon" href="/favicon.ico?v=1" />
			</Head>
			<Component {...pageProps} />
		</main>
	);
}
