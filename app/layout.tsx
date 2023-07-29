import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { BottomActions } from '@/components/bottom-actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Zapisochki',
	description: 'Zapisochki game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark'>
			<body className={inter.className}>
				<div className='min-h-screen flex flex-col max-w-xl mx-auto relative'>
					<Header />
					<main className='grow flex flex-col'>{children}</main>
					<BottomActions />
				</div>
			</body>
		</html>
	);
}
