import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { PinInput } from '@/shared/components/PinInput';
import { Button } from '@/shared/components/Button';
import { Alert } from '@/shared/components/Alert';
import { useController, useForm } from 'react-hook-form';
import { type LoginPinFormValues, loginPinSchema } from '@/features/auth/lib/schemas.ts';
import type { ParseKeys } from 'i18next';
import { config } from '@/shared/lib/config/config.ts';
import { applyServerError } from '@/features/auth/lib/applyServerError.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginPin } from '@/features/auth/api/mutations.ts';

function LoginPinForm() {
  const { t } = useTranslation('auth');
  const { mutate, isPending } = useLoginPin();
  const {
    control,
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit,
  } = useForm<LoginPinFormValues>({
    resolver: zodResolver(loginPinSchema),
    defaultValues: { login: '', pin: '' },
  });

  const { field: loginField, fieldState: loginFieldState } = useController({
    control,
    name: 'login',
  });
  const {
    field: { value: pin, onChange: onPinChange, ref: pinRef },
    fieldState: pinFieldState,
  } = useController({ control, name: 'pin' });

  const loginErrorKey = loginFieldState.error?.message;
  const pinErrorKey = pinFieldState.error?.message;
  const backendError = errors.root?.serverError;

  const loginError = loginErrorKey ? t(loginErrorKey as ParseKeys<'auth'>) : undefined;
  const pinError = pinErrorKey
    ? t(pinErrorKey as ParseKeys<'auth'>, { length: config.pinLength })
    : undefined;

  function submitCredentials(values: LoginPinFormValues) {
    clearErrors('root.serverError');
    mutate(values, {
      onError: (error) => applyServerError(error, setError, 'auth.invalidPin'),
    });
  }

  function clearServerErrors(): void {
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
          clearServerErrors();
          loginField.onChange(event);
        }}
        label={t('loginPin.loginLabel')}
        placeholder={t('loginPin.loginPlaceholder')}
        autoComplete="username"
        autoFocus
        leftIcon={<User className="size-4" />}
        error={loginError}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-text-muted text-label">{t('loginPin.pinLabel')}</span>
        <PinInput
          value={pin}
          ref={pinRef}
          error={pinError}
          onChange={(value) => {
            clearServerErrors();
            onPinChange(value);
          }}
          autoFocus={false}
        />
        {pinError && <p className="text-danger text-body-sm mt-1">{pinError}</p>}
      </div>

      <Alert message={backendError?.message} />

      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
        isLoading={isPending}
      >
        {t('loginPin.submit')}
      </Button>
    </form>
  );
}

export { LoginPinForm };
