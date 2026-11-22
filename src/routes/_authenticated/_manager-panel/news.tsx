import { createFileRoute } from '@tanstack/react-router';
import { Hourglass } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/components/Card/Card.tsx';

export const Route = createFileRoute('/_authenticated/_manager-panel/news')({
	component: NewsPage,
});

function NewsPage() {
	const { t } = useTranslation('news');
	const { t: tCommon } = useTranslation('common');
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
				{t('feed.title')}
			</h1>

			<Card className="flex flex-col items-center gap-3 py-16 text-center">
				<Hourglass
					aria-hidden="true"
					className="size-12 text-text-muted"
				/>
				<h2 className="text-display-sm">{tCommon('comingSoon.title')}</h2>
				<p className="text-body-md text-text-muted">
					{tCommon('comingSoon.hint')}
				</p>
			</Card>
		</section>
	);
}
