import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';

const TestAuthPage = async () => {
	const user = await getCurrentUser();
	return (
		<div className='flex flex-col items-center pt-10'>
			<Image
				src={user?.image || ''}
				width={60}
				height={60}
				alt='user img'
				className='rounded-full'
			/>
			<div>{user?.name}</div>
		</div>
	);
};

export default TestAuthPage;
