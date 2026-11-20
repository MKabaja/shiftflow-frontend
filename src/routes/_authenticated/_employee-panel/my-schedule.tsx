import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { CalendarX, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';
import { Toggle } from '@/shared/components/Toggle';
import { getDateFnsLocale } from '@/shared/i18n/getDateFnsLocale.ts';

export const Route = createFileRoute(
	'/_authenticated/_employee-panel/my-schedule',
)({
	component: MySchedulePage,
});

function MySchedulePage() {
	const { t, i18n } = useTranslation('schedule');
	const { t: tCommon } = useTranslation('common');
	const headingId = useId();
	const locale = getDateFnsLocale(i18n.language);

	return (
		<section
			aria-labelledby={headingId}
			className="flex flex-col gap-6 pb-6"
		>
			<h1
				id={headingId}
				className="text-display-lg"
			>
				{t('page.title')}
			</h1>

			<div className="flex flex-col gap-4">
				<Input
					type="search"
					label={t('mySchedule.searchLabel')}
					placeholder={t('mySchedule.searchPlaceholder')}
					leftIcon={<Search aria-hidden="true" />}
					disabled
				/>

				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="sm"
							disabled
							aria-label={tCommon('month.previous')}
						>
							<ChevronLeft aria-hidden="true" />
						</Button>
						<p className="text-display-sm capitalize">
							{format(new Date(), 'LLLL yyyy', { locale })}
						</p>
						<Button
							variant="ghost"
							size="sm"
							disabled
							aria-label={tCommon('month.next')}
						>
							<ChevronRight aria-hidden="true" />
						</Button>
					</div>

					<Toggle
						checked={false}
						onChange={() => undefined}
						label={t('mySchedule.onlyMe')}
						size="sm"
						disabled
					/>
				</div>
			</div>

			<Card className="flex flex-col items-center gap-3 py-12 text-center">
				<CalendarX
					aria-hidden="true"
					className="size-10 text-text-muted"
				/>
				<p className="text-body-md text-text-muted">
					{t('mySchedule.notPublished')}
				</p>
			</Card>
		</section>
	);
}
