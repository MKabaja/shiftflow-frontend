---
paths:
  - "src/**/__tests__/**"
  - "src/test/**"
  - "vitest.config.ts"
---

# Testy

Ogólne zasady: skill `testing-react`. Poniższe konwencje repo wygrywają ze skillem.

## Metodyka (od 2026-10-04)

**Sesja, która napisała kod, nigdy nie pisze do niego testów** — test dopasowany do implementacji przejdzie razem
z błędem. Przebieg, plik po pliku:

1. **Code review** pliku — Mateusz czyta kod i pyta, Claude wyjaśnia.
2. **Założenia** — Mateusz **najpierw** pisze, co chce przetestować. Claude komentuje każde i dodaje **tylko**
   brakujące elementy logiki biznesowej (nie listuje wszystkiego z góry).
3. **Spec testu** — samowystarczalny, do wklejenia: ścieżki, kontrakt, przypadki z **dokładnymi** oczekiwanymi
   wartościami (policzonymi na prawdziwej bibliotece, nie zgadniętymi), mocki, czego nie testować, weryfikacja.
   Zawsze zawiera: *„Jeśli wynik różni się od specu, zatrzymaj się i zgłoś — nie zmieniaj ani testu, ani kodu.”*
4. **Wykonanie** — inna sesja / agent `test-automator` albo Mateusz ręcznie. Nigdy sesja, która pisała kod.
5. **Review testu** — czy padnie po zepsuciu logiki (np. `>=` → `>`, usunięty strażnik).

**Testujemy** wyłącznie logikę — nasze decyzje (progi, zaokrąglenia, strażniki, zamrażanie stanu, cleanup), atrybuty
DOM (`aria-*`, `disabled`, `rel`), renderowanie warunkowe, handlery, przekazanie `className`.
**Nie testujemy** wnętrza bibliotek, wejść, których typ nie dopuszcza, stanów, których przeglądarka nie wyprodukuje,
klas Tailwinda per wariant, animacji Motion, wyglądu. Test, który przechodzi „bo nic się nie dzieje” (pusty stub zamiast
sterowalnego mocka), jest bezwartościowy.

## Konwencje
- Vitest z `globals: true` — `describe` / `it` / `expect` / `vi` bez importów. Pliki w `__tests__/` obok kodu.
- Teksty w fixture'ach — **po angielsku**; `test/setup.ts` przełącza i18n na `en`, więc asercje na tekstach po angielsku.
- Helper renderujący zawsze: `const renderButton = (props = {}, children = 'Save') => render(<Button {...props}>{children}</Button>);`
- `const user = userEvent.setup()` **w każdym teście**, nie współdzielony.
- `<Link>` z TanStack Router zawsze mockowany (potrzebuje kontekstu routera):
  ```tsx
  vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to, ...rest }: ComponentPropsWithoutRef<'a'> & { to: string }) =>
      <a href={to} {...rest}>{children}</a>,
  }));
  ```
- Motion mockuj tylko, gdy testy bez tego padają (v12 renderuje się w jsdom poprawnie).
- MSW nie jest zainstalowany — sieć mockujemy na module `shared/lib/config/axios.ts` sterowalnym `vi.fn()`
  (MSW planowany osobnym branchem).
- Komponenty czysto prezentacyjne (`Alert`, `Logo`, `Separator`, `Splash`) nie mają testów.
- Testy widoków i layoutów odłożone (decyzja 2026-07-29) — nie proponuj ich przy każdym tasku, odnotuj lukę.

## Pułapki pierwszego testu widoku / layoutu
- jsdom nie ma `window.matchMedia` — `AppLayout` (`useMatchMedia`) rzuci wyjątek bez mocka w setupie.
- `define` z `vite.config.ts` nie działa w Vitest — `ProfileModal` rzuci `ReferenceError: __APP_VERSION__ is not
  defined`, dopóki `define` nie zostanie powtórzone w `vitest.config.ts`.
