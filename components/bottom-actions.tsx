import { FC } from 'react';
import { Button } from './ui/button';

export const BottomActions: FC = () => {
	const currentUser = { username: 'Karas' };
	const amdin = { username: 'Losos' };
	return (
		<nav className='sticky bottom-0 h-16 border-t w-full bg-background container flex justify-between items-center'>
			<Button variant={'outline'}>Выйти из лобби</Button>
			{currentUser.username === amdin.username ? <Button>Начать</Button> : null}
		</nav>
	);
};
