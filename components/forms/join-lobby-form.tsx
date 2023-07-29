'use client';
import * as z from 'zod';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const formSchema = z.object({
	link: z.string().url().nonempty(),
});

export const JoinLobbyForm: FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			link: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col'>
				<FormField
					control={form.control}
					name='link'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Введите ссылку</FormLabel>
							<FormControl>
								<Input placeholder='Ссылка' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='self-end'>
					Присоединиться
				</Button>
			</form>
		</Form>
	);
};
