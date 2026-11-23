import { createFileRoute } from '@tanstack/react-router';
import { addDays, format, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button.tsx';
import { Card } from '@/shared/components/Card/Card.tsx';
import { getDateFnsLocale } from '@/shared/i18n/getDateFnsLocale.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';

export const Route = createFileRoute(
	'/_authenticated/_employee-panel/availability',
)({
	component: AvailabilityPage,
});

const DAYS_IN_WEEK = 7;
const PLACEHOLDER_CELL_IDS = Array.from(
	{ length: 35 },
	(_, index) => `cell-${index}`,
);
const SATURDAY_INDEX = 5;
const SUNDAY_INDEX = 6;

function AvailabilityPage() {
	const { t, i18n } = useTranslation('availability');
	const { t: tCommon } = useTranslation('common');
	const headingId = useId();
	const locale = getDateFnsLocale(i18n.language);
	const today = new Date();
	const weekStart = startOfWeek(today, { weekStartsOn: 1 });
	const weekdays = Array.from({ length: DAYS_IN_WEEK }, (_, index) =>
		format(addDays(weekStart, index), 'EEEEEE', { locale }),
	);

	return (
		<section
			aria-labelledby={headingId}
			className="flex flex-col gap-6 pb-6"
		>
			<header className="flex flex-col gap-1">
				<h1
					id={headingId}
					className="text-display-lg"
				>
					{t('page.title')}
				</h1>
				<p className="text-body-md text-text-muted">{t('page.description')}</p>
			</header>

			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						size="sm"
						disabled
						aria-label={tCommon('month.previous')}
					>
						<ChevronLeft aria-hidden="true" />
					</Button>
					<p className="text-display-sm capitalize">
						{format(today, 'LLLL yyyy', { locale })}
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

				<div className="grid grid-cols-7 gap-2">
					{weekdays.map((weekday, index) => (
						<span
							key={weekday}
							className={cn(
								'text-center text-label text-text-muted capitalize',
								index === SATURDAY_INDEX && 'text-warning',
								index === SUNDAY_INDEX && 'text-danger',
							)}
						>
							{weekday}
						</span>
					))}
					{PLACEHOLDER_CELL_IDS.map((cellId) => (
						<span
							key={cellId}
							aria-hidden="true"
							className="aspect-square rounded-md bg-bg-offset"
						/>
					))}
				</div>
			</Card>
		</section>
	);
}
