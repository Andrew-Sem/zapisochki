import { getCurrentUser } from '@/lib/session';
import { FC, ReactNode } from 'react';
import { notFound, redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { BottomActions } from '@/components/bottom-actions';
import { authOptions } from '@/lib/auth';

interface LobbyLayoutProps {
	children: ReactNode;
}

const LobbyLayout: FC<LobbyLayoutProps> = async ({ children }) => {
	const user = await getCurrentUser();

	if (!user) {
		redirect(authOptions?.pages?.signIn || '/login');
	}
	return (
		<div className='flex flex-col max-w-xl mx-auto relative'>
			<Header />
			<main className='grow flex flex-col'>{children}</main>
			<BottomActions />
		</div>
	);
};

export default LobbyLayout;
