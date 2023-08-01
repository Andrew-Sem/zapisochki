import { getCurrentUser } from '@/lib/session';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
	const user = await getCurrentUser();
	if (user) redirect('/');
	return <>{children}</>;
};

export default AuthLayout;
