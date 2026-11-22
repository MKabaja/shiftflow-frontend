import { createFileRoute } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button.tsx';
import { Card } from '@/shared/components/Card/Card.tsx';

export const Route = createFileRoute('/_authenticated/_manager-panel/schedule')(
	{
		component: SchedulePage,
	},
);

function SchedulePage() {
	const { t } = useTranslation('schedule');
	const headingId = useId();

	return (
		<section
			aria-labelledby={headingId}
			className="flex flex-col gap-6"
		>
			<h1
				id={headingId}
				className="text-display-lg"
			>
				{t('page.title')}
			</h1>

			<Card className="flex flex-col items-center gap-4 py-16 text-center">
				<CalendarPlus
					aria-hidden="true"
					className="size-12 text-text-muted"
				/>
				<div className="flex flex-col gap-1">
					<h2 className="text-display-sm">{t('empty.title')}</h2>
					<p className="text-body-md text-text-muted">{t('empty.hint')}</p>
				</div>
				<Button disabled>{t('empty.create')}</Button>
			</Card>
		</section>
	);
}
