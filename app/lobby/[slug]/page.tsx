import { CopyLink } from '@/components/copy-link';
import { cn } from '@/lib/utils';
import { ClipboardIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { FC } from 'react';

interface PageProps {
	params: {
		slug: string;
	};
}

const users: { username: string }[] = [
	{ username: 'Losos' },
	{ username: 'Karas' },
	{ username: 'Sudak' },
	{ username: "Yaz'" },
	{ username: "Lin'" },
	{ username: 'Vobla' },
];

const Page: FC<PageProps> = ({ params }) => {
	const currentUser = { username: 'Karas' };
	const amdin = { username: 'Losos' };
	return (
		<div className='mt-10 space-y-8'>
			<div className='container'>
				<CopyLink />
			</div>
			<div>
				<h1 className='text-2xl font-semibold container'>Лобби:</h1>
				{users.map((user) => (
					<div
						key={user.username}
						className={cn(
							'container py-3 flex space-x-4 items-center w-full',
							user.username === currentUser.username ? 'bg-secondary' : ''
						)}
					>
						<div
							className={cn(
								'rounded-full h-12 w-12 flex items-center justify-center',
								user.username === currentUser.username
									? 'bg-background'
									: 'bg-secondary'
							)}
						>
							{user.username[0]}
						</div>
						<div className='font-semibold relative'>
							{user.username}
							{user.username === amdin.username ? (
								<span className='absolute -right-4'>
									<StarFilledIcon className='w-3 h-3 text-sky-500' />
								</span>
							) : null}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Page;
