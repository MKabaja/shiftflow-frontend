import { User } from 'lucide-react';
import { getInitials } from '@/shared/lib/getInitials.ts';
import { hashColor } from '@/shared/lib/hashColor.ts';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarProps = {
  size?: AvatarSize;
  name?: string;
  imageUrl?: string; // for future implementation
  onClick?: () => void;
};

export function Avatar({ size = 'md', name, onClick }: AvatarProps) {
  const Tag = onClick ? 'button' : 'div';
  const content = name ? (
    <span aria-hidden="true">{getInitials(name)}</span>
  ) : (
    <User aria-hidden="true" />
  );

  return (
    <Tag
      style={{ backgroundColor: name ? hashColor(name) : undefined }}
      role={onClick ? undefined : 'img'}
      aria-label={name ?? 'Avatar'}
    >
      {content}
    </Tag>
  );
}
