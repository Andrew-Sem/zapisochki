import { LoginForm } from '@/components/forms/login-form';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { type FC } from 'react';

const LoginPage: FC = () => {
	return (
		<div className='flex flex-col md:flex-row-reverse md:h-screen'>
			<section className='relative md:my-auto md:w-1/3 max-w-sm w-full mx-auto md:mx-0'>
				<div className='flex flex-row items-center w-full max-w-sm mx-0 my-auto min-w-min relative md:-left-4 py-8 px-4 md:px-0 transform origin-left bg-background text-primary space-x-2 mt-10'>
					<LightningBoltIcon className='w-6 h-6 md:w-8 md:h-8' />
					<h1 className='text-3xl font-medium'>Zapisochki</h1>
				</div>
			</section>
			<section className='flex md:w-2/3 md:border-r justify-center'>
				<LoginForm />
			</section>
		</div>
	);
};

export default LoginPage;
