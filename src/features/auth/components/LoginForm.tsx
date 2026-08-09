import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormValues, loginSchema } from '../lib/schemas.ts';
import type { ParseKeys } from 'i18next';
import { config } from '@/shared/lib/config/config.ts';
import { useLogin } from '@/features/auth/api/mutations.ts';
import { applyServerError } from '@/features/auth/lib/applyServerError.ts';

function LoginForm() {
  const { t } = useTranslation('auth');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
  });

  const loginField = useController({ control, name: 'login' });
  const passwordField = useController({ control, name: 'password' });

  const loginErrorKey = loginField.fieldState.error?.message;
  const passwordErrorKey = passwordField.fieldState.error?.message;
  const backendError = errors.root?.serverError;

  const loginError = loginErrorKey ? t(loginErrorKey as ParseKeys<'auth'>) : undefined;
  const passwordError = passwordErrorKey
    ? t(passwordErrorKey as ParseKeys<'auth'>, { min: config.passwordMinLength })
    : undefined;

  function submitCredentials(values: LoginFormValues) {
    clearErrors('root.serverError');
    mutate(values, {
      onError: (error) => applyServerError(error, setError, 'auth.invalidCredentials'),
    });
  }

  function clearServerError() {
    if (backendError) clearErrors('root.serverError');
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(submitCredentials)}
    >
      <Input
        {...loginField.field}
        onChange={(event) => {
          clearServerError();
          loginField.field.onChange(event);
        }}
        label={t('login.loginLabel')}
        placeholder={t('login.loginPlaceholder')}
        autoComplete="username"
        leftIcon={<User className="size-4" />}
        error={loginError}
      />

      <Input
        {...passwordField.field}
        onChange={(event) => {
          clearServerError();
          passwordField.field.onChange(event);
        }}
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
            className={cn('hover:text-text-primary rounded-sm transition-colors', focusStyles)}
          >
            {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
        error={passwordError}
      />
      {backendError && (
        <p
          role="alert"
          className="text-danger text-body-sm mt-1"
        >
          {backendError.message}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
        isLoading={isPending}
      >
        {t('login.submit')}
      </Button>
    </form>
  );
}

export { LoginForm };
