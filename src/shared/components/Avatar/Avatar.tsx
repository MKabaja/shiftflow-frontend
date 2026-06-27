import { User } from 'lucide-react';
import { getInitials } from '@/shared/lib/getInitials.ts';
import { hashColor } from '@/shared/lib/hashColor.ts';
import { cn } from '@/shared/lib/cn.ts';
import {baseStyles,sizeStyles} from '@/shared/components/Avatar/Avatar.styles.ts';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type FallbackSize = Record<AvatarSize, number>;
type AvatarProps = {
  size?: AvatarSize;
  name?: string;
  imageUrl?: string; // for future implementation
  onClick?: () => void;
};
const IconSizes:FallbackSize = {
  xs:12,
  sm:16,
  md: 20,
  lg: 28,
  xl: 40,
}

export function Avatar({ size = 'md', name, onClick }: AvatarProps) {
  const Tag = onClick ? 'button' : 'div';
  const content = name ? (
    <span aria-hidden="true">{getInitials(name)}</span>
  ) : (
    <User aria-hidden="true" className="text-border" size={IconSizes[size]}/>
  );

  return (
    <Tag
      style={{ backgroundColor: name ? hashColor(name) : undefined }}
      role={onClick ? undefined : 'img'}
      aria-label={name ?? 'Avatar'}
      className = {cn(baseStyles,sizeStyles[size], onClick && 'cursor-pointer hover:brightness-110')}
      onClick={onClick}
      {...(onClick && { type: 'button' as const })}
    >
      {content}
    </Tag>
  );
}
