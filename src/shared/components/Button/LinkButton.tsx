import { type HTMLAttributeAnchorTarget, type ReactNode } from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Button.styles.ts';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import type { ButtonSize, ButtonVariant } from './Button.tsx';

type BaseLinkProps = LinkProps & {
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  className?: string;
};

function BaseLink(props: BaseLinkProps) {
  return <Link {...props} />;
}

const MotionLink = motion.create(BaseLink);

type LinkButtonProps = BaseLinkProps & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function LinkButton({
  variant = 'primary',
  size = 'sm',
  children,
  className,
  target,
  rel,
  ...rest
}: LinkButtonProps) {
  const safeRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;

  return (
    <MotionLink
      {...rest}
      target={target}
      rel={safeRel}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(sizeStyles[size], variantStyles[variant], baseStyles, focusStyles, className)}
    >
      {children}
    </MotionLink>
  );
}
