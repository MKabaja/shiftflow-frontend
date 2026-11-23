import { createFileRoute } from '@tanstack/react-router';
import { Search, UserRound, Users } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button.tsx';
import { Card } from '@/shared/components/Card/Card.tsx';
import { Input } from '@/shared/components/Input/Input.tsx';

export const Route = createFileRoute(
	'/_authenticated/_manager-panel/employees',
)({
	component: EmployeesPage,
});

const STATUS_FILTERS = ['all', 'active', 'inactive'] as const;

function EmployeesPage() {
	const { t } = useTranslation('employees');
	const headingId = useId();

	return (
		<section
			aria-labelledby={headingId}
			className="flex flex-1 flex-col gap-6"
		>
			<h1
				id={headingId}
				className="text-display-lg"
			>
				{t('page.title')}
			</h1>

			<div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
				<Card className="flex flex-col gap-4">
					<Input
						type="search"
						label={t('list.searchLabel')}
						placeholder={t('list.searchPlaceholder')}
						leftIcon={<Search aria-hidden="true" />}
						disabled
					/>

					<fieldset className="flex flex-wrap gap-2">
						<legend className="sr-only">{t('list.statusLabel')}</legend>
						{STATUS_FILTERS.map((status) => (
							<Button
								key={status}
								variant={status === 'all' ? 'secondary' : 'ghost'}
								size="sm"
								disabled
							>
								{t(`list.status.${status}`)}
							</Button>
						))}
					</fieldset>

					<div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
						<Users
							aria-hidden="true"
							className="size-10 text-text-muted"
						/>
						<p className="text-body-md text-text-muted">{t('list.empty')}</p>
					</div>

					<div className="flex flex-wrap gap-2">
						<Button disabled>{t('list.add')}</Button>
						<Button
							variant="secondary"
							disabled
						>
							{t('list.import')}
						</Button>
					</div>
				</Card>

				<Card className="flex flex-col items-center justify-center gap-3 py-16 text-center">
					<UserRound
						aria-hidden="true"
						className="size-12 text-text-muted"
					/>
					<p className="text-body-md text-text-muted">{t('detail.empty')}</p>
				</Card>
			</div>
		</section>
	);
}
