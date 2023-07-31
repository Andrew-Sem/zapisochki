import { FC } from 'react';
import { Button } from './ui/button';

export const BottomActions: FC = () => {
	const currentUser = { username: 'Karas' };
	const amdin = { username: 'Losos' };
	return (
		<nav className='fixed mt-16 bottom-0 h-16 border-t flex bg-background container justify-between items-center max-w-xl'>
			<Button variant={'outline'}>Выйти из лобби</Button>
			{currentUser.username === amdin.username ? <Button>Начать</Button> : null}
		</nav>
	);
};
