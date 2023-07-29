import { FC } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Header: FC = () => {
	const user = true;
	return (
		<header className='container flex justify-between items-center h-16 sticky top-0 border-b'>
			<h2 className='font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-muted-foreground to-accent-foreground'>
				Zapisochki
			</h2>
			{user ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<DotsVerticalIcon className='w-6 h-6' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Профиль</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Выйти</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : null}
		</header>
	);
};
