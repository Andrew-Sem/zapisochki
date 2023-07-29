import { Button } from '@/components/ui/button';

export default function Home() {
	const user = true;
	return (
		<div className='grow flex flex-col justify-center text-center max-w-md w-full container space-y-10'>
			{user ? (
				<>
					<h1 className='text-3xl font-semibold'>Дарова, username</h1>
					<div className='flex flex-col space-y-4'>
						<Button>Присоединиться к лобби</Button>
						<Button variant={'outline'}>Создать свою игру</Button>
					</div>
				</>
			) : (
				<>
					<h1 className='text-3xl font-semibold'>Войдите, чтобы начать играть</h1>
					<Button>Войти</Button>
				</>
			)}
		</div>
	);
}
