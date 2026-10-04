import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { useIsClamped } from '@/shared/hooks/useIsClamped.ts';
import { getDateFnsLocale } from '@/shared/i18n/getDateFnsLocale.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { formatRelativeDate } from '@/shared/lib/helpers/formatRelativeDate.ts';
import type { NewsPost } from '@/shared/types/api.ts';

type NewsCardProps = {
  post: NewsPost;
};

function NewsCard({ post }: NewsCardProps) {
  const { t, i18n } = useTranslation('news');
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const isClamped = useIsClamped(contentRef, !expanded);
  const titleId = useId();
  const contentId = useId();
  const publishedAt = formatRelativeDate(post.created_at, getDateFnsLocale(i18n.language));

  return (
    <Card>
      <article
        aria-labelledby={titleId}
        className="flex flex-col gap-3"
      >
        <header className="flex items-start gap-3">
          <Bell
            className="text-text-muted mt-1 size-5 shrink-0"
            aria-hidden={true}
          />
          <h2
            id={titleId}
            className="text-display-md min-w-0 flex-1 wrap-break-word"
          >
            {post.title}
          </h2>
          {post.is_important && (
            <span className="mt-1 shrink-0">
              <Badge variant="accent">{t('card.important')}</Badge>
            </span>
          )}
        </header>

        <p
          id={contentId}
          ref={contentRef}
          className={cn(
            'text-text-primary text-body-md wrap-break-word whitespace-pre-line',
            !expanded && 'line-clamp-2',
          )}
        >
          {post.content}
        </p>

        {(expanded || isClamped) && (
          <Button
            variant="ghost"
            aria-expanded={expanded}
            aria-controls={contentId}
            aria-describedby={titleId}
            onClick={() => setExpanded((isExpanded) => !isExpanded)}
            className="-ml-3 self-start"
          >
            {expanded ? t('card.readLess') : t('card.readMore')}
          </Button>
        )}

        <footer className="text-text-muted text-body-sm flex flex-wrap gap-1.5">
          {post.author && <span>{post.author.name}</span>}
          {post.author && publishedAt && <span aria-hidden={true}>·</span>}
          {publishedAt && <time dateTime={post.created_at}>{publishedAt}</time>}
        </footer>
      </article>
    </Card>
  );
}

export { NewsCard };
