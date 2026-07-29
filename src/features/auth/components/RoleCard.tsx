import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { LinkButton, type ButtonVariant } from '@/shared/components/Button';

type RoleCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  to: LinkProps['to'];
  variant?: ButtonVariant;
};

function RoleCard({ icon: Icon, title, description, cta, to, variant = 'primary' }: RoleCardProps) {
  return (
    <Card
      variant="elevated"
      className="flex flex-1 flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-display-md">{title}</h2>
        <Icon
          className="text-text-muted size-6"
          aria-hidden={true}
        />
      </div>
      <p className="text-text-muted text-body-md">{description}</p>
      <LinkButton
        className="mt-auto self-start"
        variant={variant}
        to={to}
      >
        {cta}
      </LinkButton>
    </Card>
  );
}

export { RoleCard };