---
paths:
  - "src/features/**/api/**"
  - "src/features/**/lib/**"
  - "src/features/**/components/**/*Form*.tsx"
  - "src/features/**/components/**/*Modal*.tsx"
  - "src/shared/lib/config/axios.ts"
  - "src/shared/lib/config/queryClient.ts"
  - "src/shared/lib/config/queryKeys.ts"
  - "src/shared/lib/helpers/parseApiError*"
---

# Query, mutacje, formularze, obsługa błędów

## Warstwy błędów
1. **Interceptor axios** obsługuje **wyłącznie** 401 = śmierć sesji (poza `/auth/login*`): ustawia `auth.me` na `null`.
   Sam nie przekierowuje — wyrzuca guard `_app` przy najbliższej nawigacji. Wszystkie błędy odrzuca dalej.
2. **`parseApiError`** — czysta funkcja: dowolny błąd → `{ messageKey, fieldErrors?, statusCode? }`. `messageKey` to
   klucz i18n z przestrzeni `errors` (`ParseKeys<'errors'>`), nigdy surowy tekst backendu.
3. **Globalny `onError`** w `queryClient` (QueryCache + MutationCache): zapasowy
   `toast.error(i18n.t(key, { ns: 'errors' }))`. Query/mutacja, która sama pokazuje błąd → `meta: { handled: true }`
   (typowane przez augmentację `Register` w `queryClient.ts`).
4. **Błędy kontekstowe** (422 → pola RHF, 401 przy logowaniu → jeden ogólny komunikat) w `onError` konkretnej mutacji.
   Zod waliduje **przed** wysłaniem — to osobna warstwa od błędów serwera.

## Błędy w formularzu (`features/auth/lib/applyServerError.ts`)

| rodzaj | przykład | ma pole? | gdzie widać |
| --- | --- | --- | --- |
| Zod (klient) | za krótkie hasło | tak | pod polem, prop `error` w `Input` |
| 422 (serwer) | backend odrzucił format | tak — `fieldErrors` | to samo miejsce |
| bez pola | 401, 403, 429, sieć | nie | `<p role="alert">` nad przyciskiem |

- Jeden kanał: `formState.errors` — błędy pól pod nazwą pola, reszta pod `root.serverError`. Zapisywany jest **klucz**
  i18n; formularz tłumaczy przy renderze (drugi `useTranslation('errors')`), więc komunikat zmienia się z językiem.
- 401 przy logowaniu nie ma pola — backend celowo odpowiada tak samo na zły login i złe hasło. Mutacje logowania mają
  `meta: { handled: true }`, bo globalny komunikat 401 („sesja wygasła”) byłby tam nieprawdziwy.
- **Nowy formularz z własnymi błędami:** `meta: { handled: true }` na mutacji, `applyServerError` w `onError`,
  czyszczenie `root.serverError` przed każdym submitem. Toasty zostają dla błędów poza formularzem (refetch w tle,
  mutacje bez własnego UI).

## Query
- Klucze tylko z `shared/lib/config/queryKeys.ts`. Login i login-pin zapisują odpowiedź prosto do `auth.me`.
- Przed implementacją hooka API potwierdź kształt odpowiedzi curlem (patrz `CLAUDE.md` → Backend API).
