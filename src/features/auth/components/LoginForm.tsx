import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';

function LoginForm() {
  const { t } = useTranslation('auth');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form
      className="flex w-full flex-col gap-4"
      noValidate
    >
      <Input
        label={t('login.loginLabel')}
        placeholder={t('login.loginPlaceholder')}
        autoComplete="username"
        leftIcon={<User className="size-4" />}
      />

      <Input
        label={t('login.passwordLabel')}
        placeholder={t('login.passwordPlaceholder')}
        type={isPasswordVisible ? 'text' : 'password'}
        autoComplete="current-password"
        leftIcon={<Lock className="size-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={isPasswordVisible ? t('login.hidePassword') : t('login.showPassword')}
            aria-pressed={isPasswordVisible}
            className={cn('rounded-sm hover:text-text-primary transition-colors', focusStyles)}
          >
            {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />

      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
      >
        {t('login.submit')}
      </Button>
    </form>
  );
}

export { LoginForm };
