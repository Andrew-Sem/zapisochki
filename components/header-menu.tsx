'use client';
import { Session } from 'next-auth';
import { FC } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';

interface HeaderMenuProps {
	user: Session | null;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ user }) => {
	return (
		<>
			{user ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<DotsVerticalIcon className='w-6 h-6' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Профиль</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='cursor-pointer'
							onClick={(e) => {
								e.preventDefault();
								signOut();
							}}
						>
							Выйти
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : null}
		</>
	);
};
