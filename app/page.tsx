import { JoinLobbyForm } from '@/components/forms/join-lobby-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getAllQuotes } from '@/lib/db/getAllQuotes';
import { generateRandomString } from '@/utils/generateRandomString';
import Link from 'next/link';

export default async function Home() {
	const data = await getAllQuotes();
	console.log(data);
	const newLobbyUrl = '/lobby/' + generateRandomString(16);
	const user = true;
	return (
		<div className='grow flex flex-col justify-center text-center max-w-md w-full container space-y-10'>
			{user ? (
				<>
					<h1 className='text-3xl font-semibold'>Дарова, username</h1>
					<div className='flex flex-col space-y-4'>
						<Dialog>
							<DialogTrigger asChild>
								<Button>Присоединиться к лобби</Button>
							</DialogTrigger>
							<DialogContent>
								<JoinLobbyForm />
							</DialogContent>
						</Dialog>
						<Link href={newLobbyUrl}>
							<Button variant={'outline'} className='w-full'>
								Создать свою игру
							</Button>
						</Link>
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
