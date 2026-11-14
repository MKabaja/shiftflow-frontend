import { Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function NewsFeedEmpty() {
	const { t } = useTranslation('news');

	return (
		<div className="flex flex-col items-center gap-2 py-12 text-center">
			<Newspaper
				className="size-10 text-text-muted"
				aria-hidden={true}
			/>
			<p className="text-body-lg text-text-primary">{t('feed.empty')}</p>
			<p className="text-body-sm text-text-muted">{t('feed.emptyHint')}</p>
		</div>
	);
}

export { NewsFeedEmpty };
