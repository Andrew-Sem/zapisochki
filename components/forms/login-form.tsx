'use client';

import { FC } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
	username: z.string().min(6, { message: 'Минимальная длина - 6 символов' }),
	email: z.string().email('Некорректный email').nonempty('Не может быть пустым'),
});

export const LoginForm: FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// const signInResult = await signIn('email', {
		// 	email: values.email.toLowerCase(),
		// 	redirect: false,
		// 	callbackUrl: '/',
		// });

		const signInResult = await signIn('github');

		if (!signInResult?.ok) {
			return toast({
				title: 'Something went wrong.',
				description: 'Your sign in request failed. Please try again.',
				variant: 'destructive',
			});
		}

		console.log(values);
	};
	return (
		<div className='rounded-lg p-4 max-w-sm mx-auto my-auto space-y-6 w-full'>
			<h3 className='text-xl font-medium'>Вход</h3>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex flex-col'>
					<div className='space-y-3'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Никнейм' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' className=''>
						Войти
					</Button>
				</form>
			</Form>
			<div className='flex flex-col pt-3'>
				<hr className='h-0 border-t mt-sm' />
				<div className='-mt-2.5 text-sm text-center'>
					<span className='px-3 bg-background text-muted-foreground'>Или</span>
				</div>
			</div>
			<div className='space-y-3 w-full max-w-sm'>
				<Button
					variant={'outline'}
					className='w-full justify-normal space-x-4 py-4 group relative'
					onClick={() => {
						signIn('google');
					}}
				>
					<Image
						src={'icons/google.svg'}
						height={25}
						width={25}
						alt='google'
						className='text-teal-5000'
					/>
					<span>Войти с Google</span>
					<ArrowRightIcon className='absolute scale-95 group-hover:scale-105 opacity-0 group-hover:opacity-100 duration-150 right-6 group-hover:right-4' />
				</Button>
				<Button
					variant={'outline'}
					className='w-full justify-normal space-x-4 py-4 group relative'
					onClick={() => {
						signIn('github');
					}}
				>
					<GitHubLogoIcon className='w-[25px] h-[25px]' />
					<span>Войти с GitHub</span>
					<ArrowRightIcon className='absolute scale-95 group-hover:scale-105 opacity-0 group-hover:opacity-100 duration-150 right-6 group-hover:right-4' />
				</Button>
			</div>
		</div>
	);
};
