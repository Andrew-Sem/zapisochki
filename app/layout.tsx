import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Zapisochki',
	description: 'Zapisochki game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark'>
			<body className={inter.className}>
				<div className='min-h-screen flex flex-col'>
					<Header />
					<main className='h-full'>{children}</main>
				</div>
			</body>
		</html>
	);
}
