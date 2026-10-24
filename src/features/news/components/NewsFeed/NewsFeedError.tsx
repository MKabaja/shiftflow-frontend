import { useTranslation } from 'react-i18next';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';

type NewsFeedErrorProps = {
  onRetry: () => void;
};

function NewsFeedError({ onRetry }: NewsFeedErrorProps) {
  const { t } = useTranslation('news');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="flex flex-col items-start gap-3">
      <Alert message={t('feed.error')} />
      <Button
        variant="secondary"
        onClick={onRetry}
      >
        {tCommon('actions.retry')}
      </Button>
    </div>
  );
}

export { NewsFeedError };
