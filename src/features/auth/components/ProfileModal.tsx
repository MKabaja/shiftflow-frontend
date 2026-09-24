import type { ModalPlacement } from '@/shared/components/Modal';
import { Modal } from '@/shared/components/Modal';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/components/Avatar';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { LogOut, Settings } from 'lucide-react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import { useLogout } from '@/features/auth/api/mutations.ts';
import { Link } from '@tanstack/react-router';

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  placement: ModalPlacement;
};

function ProfileModal({ isOpen, onClose, placement }: ProfileModalProps) {
  const { user } = useAuth();
  const { t } = useTranslation('auth');
  const positions = user?.positions ?? [];
  const { mutate: logout, isPending } = useLogout();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      title={t('profile.title')}
      meta={`${t('profile.version')} ${__APP_VERSION__}`}
      footer={
        <>
          <Link
            className={cn(
              'text-text-muted hover:text-text-primary flex flex-1 items-center gap-2 rounded-md',
              focusStyles,
            )}
            to="/settings"
            onClick={onClose}
          >
            <Settings size={20} />
            {t('profile.settings')}
          </Link>
          <Button
            isLoading={isPending}
            variant="danger"
            onClick={() => logout()}
          >
            <LogOut size={20} />
            {t('profile.logout')}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar
            size="xl"
            name={user?.name}
          />
          <p className="text-display-lg mt-3">{user?.name}</p>
          <dl>
            <dt className="sr-only">{t('profile.loginLabel')}</dt>
            <dd className="text-text-muted">{user?.login}</dd>
          </dl>
          {user && <Badge variant="accent">{t(`roles.${user.role}`, { ns: 'common' })}</Badge>}
        </div>
        <div className="border-border-subtle border-t pt-6">
          <h3 className="font-body text-text-muted mb-3 font-medium tracking-wider uppercase">
            {t('profile.positions')}
          </h3>

          {positions.length > 0 ? (
            <ul className="flex flex-row flex-wrap gap-4">
              {positions.map((position) => (
                <li
                  key={position.id}
                  className="bg-bg-surface/50 shadow-nm-subtle inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1"
                >
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: position.color }}
                  ></span>
                  <span className="font-display text-text-primary font-semibold">
                    {position.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-body-md">{t('profile.noPositions')}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export { ProfileModal };
