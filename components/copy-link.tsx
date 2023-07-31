'use client';

import { ClipboardIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';
import { cn } from '@/lib/utils';

export const CopyLink: FC = () => {
	const [isCopied, setIsCopied] = useState(false);
	const [hintTimeout, setHintTimeout] = useState<ReturnType<typeof setTimeout>>();
	const link = 'https://vk.com/im?sel=156224284...';
	const copyLinkHandler = () => {
		navigator.clipboard.writeText(link);
		clearTimeout(hintTimeout);
		setIsCopied(true);
		setHintTimeout(
			setTimeout(() => {
				setIsCopied(false);
			}, 1500)
		);
	};

	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-semibold'>Ссылка-приглашение:</h1>
			<div className='bg-secondary p-4 rounded-md flex justify-between items-center'>
				<span>{link}</span>
				<div className='relative'>
					<button onClick={copyLinkHandler} className='p-1'>
						<ClipboardIcon
							className={cn(
								'w-5 h-5 text-muted-foreground transition duration-200',
								isCopied ? 'text-sky-500' : 'hover:text-accent-foreground'
							)}
						/>
					</button>
					{isCopied ? (
						<div className='absolute bottom-full left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background text-sm rounded-md border mb-1.5'>
							Скопировано
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
