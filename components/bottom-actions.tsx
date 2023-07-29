import { FC } from 'react';
import { Button } from './ui/button';

export const BottomActions: FC = () => {
	const currentUser = { username: 'Losos' };
	const amdin = { username: 'Losos' };
	return (
		<nav className='fixed bottom-0 h-16 border-t w-full bg-background container flex justify-between items-center'>
			<Button variant={'outline'}>Выйти из лобби</Button>
			{currentUser.username === amdin.username ? <Button>Войти</Button> : null}
		</nav>
	);
};
