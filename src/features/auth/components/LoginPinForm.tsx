import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { PinInput } from '@/shared/components/PinInput';
import { Button } from '@/shared/components/Button';

function LoginPinForm() {
  const { t } = useTranslation('auth');

  return (
    <form
      className="flex w-full flex-col gap-4"
      noValidate
    >
      <Input
        label={t('loginPin.loginLabel')}
        placeholder={t('loginPin.loginPlaceholder')}
        autoComplete="username"
        autoFocus
        leftIcon={<User className="size-4" />}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-text-muted text-label">{t('loginPin.pinLabel')}</span>
        <PinInput autoFocus={false} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
      >
        {t('loginPin.submit')}
      </Button>
    </form>
  );
}

export { LoginPinForm };