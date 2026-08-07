import type { UseFormSetError } from 'react-hook-form';
import type { LoginFormValues } from '@/features/auth/lib/schemas.ts';
import type { ParseKeys } from 'i18next';
import i18n from '@/shared/i18n';
import { parseApiError } from '@/shared/lib/helpers/parseApiError.ts';

/**
 * Translates a failed auth request into React Hook Form error state.
 *
 * The login mutations opt out of the global error toast, so a rejected request
 * would otherwise be invisible: the submit button simply stops spinning. This
 * is the only place that decides where such an error shows up on screen.
 */

function applyServerError(
  error: unknown,
  setError: UseFormSetError<LoginFormValues>,
  invalidKey: ParseKeys<'errors'>,
): void {
  const { messageKey, statusCode, fieldErrors } = parseApiError(error);
  if (fieldErrors) {
    const entries = Object.entries(fieldErrors) as [keyof LoginFormValues, string[]][];

    entries.forEach(([field, value]) => {
      setError(field, {
        type: 'server',
        message: value[0],
      });
    });
    return;
  }

  let key = messageKey;
  if (statusCode === 401) key = invalidKey;
  if (statusCode === 403) key = 'auth.accountDeactivated';

  setError('root.serverError', {
    type: 'server',
    message: i18n.t(key, { ns: 'errors' }),
  });
}

export { applyServerError };

// --- TYPES -------------------------------------------------------------------
//
// AuthErrorKeys — one field, `invalid`, typed as ParseKeys<'errors'>.
//   Carries the form-specific wording for a 401: LoginForm passes
//   'auth.invalidCredentials', LoginPinForm passes 'auth.invalidPin'.
//   Everything else about the two forms is identical, so this is the only
//   parameter that varies.
//
// The function is generic over T extends FieldValues so it works with both
// LoginInput and LoginPinInput. `Path<T>` is the union of valid field names for
// that form — needed because setError refuses a plain string.

// --- SIGNATURE ---------------------------------------------------------------
//
// (error: unknown, setError: UseFormSetError<T>, keys: AuthErrorKeys) => void
//
// `error` is unknown, not AxiosError — parseApiError narrows it and handles the
// non-axios case, so callers pass whatever onError hands them.
//
// Returns nothing. The effect is entirely "errors are now in formState".

// --- STEP 1: decode ----------------------------------------------------------
//
// Run parseApiError(error) → { messageKey, fieldErrors?, statusCode? }.
//   messageKey — i18n key in the `errors` namespace, already mapped by status
//   fieldErrors — present only for 422 with a body: Record<string, string[]>
//   statusCode — undefined when there was no response at all (network failure)

// --- STEP 2: field-scoped errors (422) ---------------------------------------
//
// If fieldErrors exists, the server disagreed about specific fields. Loop over
// its entries and setError(field, { type: 'server', message: messages[0] }),
// then return early — a 422 has no form-level message to add.
//
// Two things to be aware of here:
//
//   - messages[0] is raw backend prose (English, outside our control). Passing
//     it through breaks the rule that user-facing text comes from our own
//     locale files. Accepted deliberately: Zod already rejects malformed input
//     before the request, so a 422 on login is close to unreachable, and
//     inventing per-field keys for it is not worth the maintenance.
//
//   - The backend field names must match the form's field names. They do here
//     (`login`, `password`, `pin`), but an unexpected name would silently
//     create an error nothing renders. Hence the `as Path<T>` cast — it is an
//     assumption, not a guarantee.

// --- STEP 3: form-level errors -----------------------------------------------
//
// Anything without a field goes to setError('root.serverError', ...).
// `root` is a reserved React Hook Form name: it is not a form field, it does
// not block submission, and it exists precisely for "the form as a whole
// failed". The form renders it above the submit button with role="alert".
//
// Pick the key by status:
//
//   401 → keys.invalid
//     parseApiError maps 401 to 'unauthorized' ("your session has expired"),
//     which is right everywhere except here — at login no session expired, the
//     credentials were simply wrong. This override is the reason the function
//     exists rather than calling parseApiError directly from the component.
//
//     The backend answers a wrong login and a wrong password with the same 401
//     on purpose, so there is genuinely no field to attach this to: telling the
//     user which half was wrong would let an attacker enumerate valid logins.
//
//   403 → 'auth.accountDeactivated'
//   anything else → messageKey as parsed (429 → 'tooMany', no response →
//     'network', unknown status → 'unexpected')
//
// Then resolve the key to text with i18n.t(key, { ns: 'errors' }) and pass it
// as the message. The i18n instance is imported directly rather than taken from
// useTranslation because this is a plain function, not a hook.

// --- CALLER CONTRACT ---------------------------------------------------------
//
// The submit handler clears the previous form-level error before mutating
// (clearErrors('root.serverError')); field errors are rebuilt by the resolver
// on every submit, so only `root` needs clearing by hand.