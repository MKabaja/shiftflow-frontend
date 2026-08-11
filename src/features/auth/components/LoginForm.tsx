import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, User } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Alert } from '@/shared/components/Alert';
import { VisibilityToggle } from '@/shared/components/VisibilityToggle';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormValues, loginSchema } from '../lib/schemas.ts';
import type { ParseKeys } from 'i18next';
import { config } from '@/shared/lib/config/config.ts';
import { useLogin } from '@/features/auth/api/mutations.ts';
import { applyServerError } from '@/features/auth/lib/applyServerError.ts';

function LoginForm() {
  const { t } = useTranslation('auth');
  const [isPasswordMasked, setIsPasswordMasked] = useState(true);
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

  const { field: loginField, fieldState: loginFieldState } = useController({
    control,
    name: 'login',
  });
  const { field: passwordField, fieldState: passwordFieldState } = useController({
    control,
    name: 'password',
  });

  const loginErrorKey = loginFieldState.error?.message;
  const passwordErrorKey = passwordFieldState.error?.message;
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
        {...loginField}
        onChange={(event) => {
          clearServerError();
          loginField.onChange(event);
        }}
        label={t('login.loginLabel')}
        placeholder={t('login.loginPlaceholder')}
        autoComplete="username"
        leftIcon={<User className="size-4" />}
        error={loginError}
      />

      <Input
        {...passwordField}
        onChange={(event) => {
          clearServerError();
          passwordField.onChange(event);
        }}
        label={t('login.passwordLabel')}
        placeholder={t('login.passwordPlaceholder')}
        type={isPasswordMasked ? 'password' : 'text'}
        autoComplete="current-password"
        leftIcon={<Lock className="size-4" />}
        rightIcon={
          <VisibilityToggle
            masked={isPasswordMasked}
            setMasked={setIsPasswordMasked}
            showLabel={t('login.showPassword')}
            hideLabel={t('login.hidePassword')}
          />
        }
        error={passwordError}
      />
      <Alert message={backendError?.message} />
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
