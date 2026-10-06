import { useTranslation } from 'react-i18next';
import { Newspaper } from 'lucide-react';

function NewsFeedEmpty() {
  const { t } = useTranslation('news');

  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <Newspaper
        className="text-text-muted size-10"
        aria-hidden={true}
      />
      <p className="text-text-primary text-body-lg">{t('feed.empty')}</p>
      <p className="text-text-muted text-body-sm">{t('feed.emptyHint')}</p>
    </div>
  );
}

export { NewsFeedEmpty };
