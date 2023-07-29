import { cn } from '@/lib/utils';
import { ClipboardIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { StarIcon } from 'lucide-react';
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
		<div className='mt-10 space-y-8 max-w-xl mx-auto'>
			<div className='container space-y-4'>
				<h1 className='text-2xl font-semibold'>Ссылка-приглашение:</h1>
				<div className='bg-secondary py-2 px-4 rounded-md flex space-x-4 justify-between'>
					<span>https://vk.com/im?sel=156224284...</span>
					<button>
						<ClipboardIcon className='w-5 h-5 hover:text-sky-500 transition duration-200' />
					</button>
				</div>
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
						<div className='font-semibold'>
							{user.username}
							{user.username === amdin.username ? (
								<span className='absolute'>
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
