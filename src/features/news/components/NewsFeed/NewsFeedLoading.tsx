import { useTranslation } from 'react-i18next';
import { NewsCardSkeleton } from '@/features/news/components/NewsCardSkeleton.tsx';

const SKELETON_COUNT = 2;

function NewsFeedLoading() {
  const { t } = useTranslation('common');

  return (
    <div
      role="status"
      className="flex flex-col gap-4"
    >
      <span className="sr-only">{t('loading')}</span>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </div>
  );
}

export { NewsFeedLoading };
