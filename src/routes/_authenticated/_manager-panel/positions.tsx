import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';

export const Route = createFileRoute(
	'/_authenticated/_manager-panel/positions',
)({
	component: PositionsPage,
});

const TABLE_COLUMNS = [
	'color',
	'name',
	'description',
	'createdBy',
	'actions',
] as const;

function PositionsPage() {
	const { t } = useTranslation('positions');
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

			<div className="flex flex-wrap items-end justify-between gap-4">
				<div className="w-full max-w-sm">
					<Input
						type="search"
						label={t('searchLabel')}
						placeholder={t('searchPlaceholder')}
						leftIcon={<Search aria-hidden="true" />}
						disabled
					/>
				</div>
				<Button disabled>{t('add')}</Button>
			</div>

			<Card className="overflow-x-auto p-0">
				<table className="w-full text-left">
					<thead>
						<tr className="border-b border-border-subtle">
							{TABLE_COLUMNS.map((column) => (
								<th
									key={column}
									scope="col"
									className="px-4 py-3 text-label text-text-muted"
								>
									{t(`table.${column}`)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								colSpan={TABLE_COLUMNS.length}
								className="px-4 py-12 text-center text-body-md text-text-muted"
							>
								{t('empty')}
							</td>
						</tr>
					</tbody>
				</table>
			</Card>
		</section>
	);
}
