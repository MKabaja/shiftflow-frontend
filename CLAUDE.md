# ShiftFlow — frontend

Grafik zmian pracowników Kopalni Soli „Wieliczka”: panel kierownika + moduł dyspozycji pracownika.
Stack: React 19, TypeScript 6 (strict), Vite 8, Tailwind CSS v4, TanStack Router + Query v5, Zustand 5,
React Hook Form + Zod v4, i18next, Motion 12; HTTP: własny klient na `fetch`. Testy: Vitest 4 + Testing Library
(jsdom) + MSW 2.
Backend: Laravel, osobne repo `~/projekty/SHIFTFlow`. Środowisko: WSL (Ubuntu), Node 24 — ta sama wersja co CI.

<!-- Utrzymanie: < 200 linii, każda linia ma zapobiegać realnemu błędowi. Reguły dotyczące części kodu
     → .claude/rules/ (paths:). docs/ jest gitignorowany — na innym komputerze go nie ma, więc nic
     potrzebnego w każdej sesji nie może żyć wyłącznie w docs/. Poprzednia wersja:
     docs/archive/CLAUDE_2026-10-20_przed-przebudowa.md -->

## ⚠️ Merge do `main` = produkcja

Każdy push do `main` uruchamia CI: `lint` + `test` → `build` → **`deploy`** na `https://shiftflow.duckdns.org`.
Nie ma stagingu. Zmiany idą małymi branchami przez PR (na PR `deploy` jest pomijany).

## Komendy

```bash
npm run dev                          # Vite + HMR; /api proxowane na localhost:8000
npm run check                        # typecheck + lint + test + build — przed każdym pushem
npm run typecheck                    # tsc -b (app + node przez references)
npm run lint                         # ESLint, --max-warnings 0 (autofix: npm run lint:fix)
npm run test:run                     # vitest jednorazowo (samo `npm run test` = watch)
npx vitest run src/ścieżka/X.test.tsx  # pojedynczy plik testów
npm run build                        # tsc -b + vite build
```

- Po `npm install`, który zmienił `package-lock.json` → `npm ci` przed pushem. `check` pracuje na istniejącym
  `node_modules`, rozjechanego locka nie złapie — CI padnie dopiero na `npm ci`.
- Typy sprawdzaj przez `npm run typecheck`, nie gołym `tsc` / `npx tsc --noEmit`: główny `tsconfig.json` ma
  tylko `references` (`"files": []`), więc `tsc` bez `-b` sprawdza 0 plików i zawsze wychodzi „czysto”.

## Gotowe =

- `npm run check` przechodzi — podajesz rzeczywisty wynik, nigdy nie deklarujesz sukcesu bez uruchomienia.
- Nowy route dopisany do drzewa w `router.ts`; nowa przestrzeń i18n we wszystkich 4 plikach (`rules/i18n.md`).
- Zmieniony lock → `npm ci` przeszło.

## Współpraca i granice

- **Kod pisze Mateusz; Claude jest recenzentem i doradcą (senior).** Nie implementuje bez wyraźnej prośby
  („napisz”, „zrób”, „stwórz”, „utwórz”).
- Przy nowym kroku zapytaj, kto pisze kod. Gdy Mateusz — nie podawaj planu, szkieletu ani gotowca, dopóki nie
  poprosi; rób review tego, co napisał.
- Gdy pisze Claude: tylko to, o co poproszono. Przy większej zmianie najpierw plan **jednego kroku** z krytyczną
  oceną propozycji Mateusza; start po akceptacji. Testy osobnym krokiem. Limity i stałe w `config.ts`.
  Preferuj biblioteki już zainstalowane.
- Po większej zmianie: krótkie podsumowanie — co zrobiono, gdzie, wynik weryfikacji, max 3 uwagi jakościowe.
- Przed przeszukiwaniem kodu zapytaj, czy działać.
- Odpowiedzi po polsku, zwięźle, krok po kroku — sesja robocza, nie wykład. Bez tematów, o które nie pytano.
- Komendy terminala w składni **bash (WSL)**.
- Teoretyczny wyścig / migotanie: zapisz i podaj krok reprodukcji; naprawiaj dopiero po odtworzeniu na żywo.
- **Najpierw zapytaj:** nowa zależność (instaluje Mateusz — podajesz komendę), zmiana w obszarze objętym ADR.
- **Nigdy:**
  - operacji git zmieniających stan (commit, branch, PR, push/pull) — podajesz komendy, wykonuje Mateusz;
    czytanie (`status`, `log`, `diff`) jest OK,
  - komend na serwerze — podajesz jeden krok + krótko „dlaczego”, czekasz na wklejony output,
  - wyłączania reguł ESLint/TS, żeby ukryć błąd,
  - plików `.env*` (stałe → `shared/lib/config/config.ts`),
  - importu `package.json` w kodzie aplikacji (bundler wkleiłby cały plik; wersja = `__APP_VERSION__` z `define`).

## Skille i agenci

Przed zadaniem z kodem sprawdź tę mapę. **Na początku odpowiedzi napisz „Skille: X, Y”** albo
„Skille: brak pasującego”. Przy konflikcie wygrywają: ten plik i `.claude/rules/` → skill główny → uzupełniające.

| Zadanie | Skill główny | Uzupełniające |
| --- | --- | --- |
| pisanie / review TS, React, hooków | `react-clean-code` | `modern-best-practice-react-components`, `clean-typescript` |
| testy, spec testu, review testu | `testing-react` | — |
| komentarz `/** */` nad eksportem (TSDoc) | `tsdoc` | — |
| klasy Tailwind, style | `modern-tailwind` (tokeny i tak z `theme.css`) | — |
| semantyka, dostępność, klawiatura | `modern-accessible-html-jsx` | `use-modern-browser-apis` |
| bezpieczeństwo (auth, cookie, dane) | `web-security` | `/security-review` |
| CLAUDE.md, rules, skille | `claude-md-guide` | `/doctor prompt-audit` |
| sprzątanie po zmianie | `/simplify` | — |

`clean-typescript` zaleca `interface` — w tym projekcie obowiązuje `type` (`rules/code-style.md`).
Agenci projektowi (`.claude/agents/`): `reviewer` — review zmian; `test-automator` — wykonanie gotowego specu testu
(nigdy w sesji, która pisała testowany kod).

## Architektura — decyzje

- Kod funkcjonalności → `src/features/<nazwa>/{api,hooks,lib,components}`. `src/shared/` tylko dla rzeczy
  używanych przez więcej niż jeden feature. Layout po zalogowaniu: **jeden** responsywny `AppLayout` (obie role).
- **Hook tylko, gdy potrzebuje stanu, efektu albo kontekstu.** Inaczej zwykła funkcja w `lib/` — wywoływalna poza
  Reactem (np. w `beforeLoad`) i testowalna bez `renderHook`.
- **Routing jest code-based** (mimo nazw `_app.tsx`, `_panel.tsx`): nowy route działa dopiero po dopisaniu do drzewa
  w `shared/lib/config/router.ts` — inaczej ciche 404. Szczegóły: `rules/routing.md`.
- **Zalogowany user = wyłącznie cache Query pod `auth.me`.** `useMe` → `useAuth` (nakładka z flagami ról, zero
  własnego stanu). Login i login-pin zapisują odpowiedź prosto do `auth.me`. **Nie przenoś usera do Zustanda.**
- Stan serwerowy → TanStack Query, klucze w `shared/lib/config/queryKeys.ts`. Transport → `backend` z
  `shared/api/backend.ts` (ścieżki względem `/api`, same-origin, cookie wysyłane samo); nie wołaj `fetch` bezpośrednio.
- Zustand → wyłącznie stan UI niezwiązany z serwerem (na dziś brak store'ów; zależność zostaje).
- Formularze → React Hook Form + Zod v4; komunikaty w schematach to **klucze i18n**.
- Błędy → warstwowo: handler 401 (`onUnauthorized`) → `parseApiError` → globalny `onError` (toast) → `onError` mutacji / formularz.
  Szczegóły: `rules/forms-errors.md`.
- Teksty UI zawsze przez `t()`; typy kluczy pochodzą z plików `pl` (`rules/i18n.md`).

## Decyzje architektoniczne (ADR)

| ADR | Decyzja | Status |
| --- | --- | --- |
| 001 | User tylko w cache Query (`auth.me`); async `beforeLoad` + `ensureQueryData` → sesja przeżywa F5 | wdrożony |
| 002 | Login i login-pin zwracają ten sam `UserResource` co `/me` | wdrożony |
| 003 | Same-origin: względne `/api` (proxy Vite / nginx); cookie host-only `SameSite=Lax` — `duckdns.org` jest na PSL | wdrożony |
| 004 | Zapamiętanie metody logowania w `localStorage` do celowanego redirectu po 401 | planowany (post-MVP); dziś 401 → `/` |
| 005 | Stałe w `config.ts` zamiast `.env*`; wersja aplikacji przez `define` | wdrożony |
| 006 | Migracja na file-based routing — osobny branch przed Branchem 5, żaden URL się nie zmienia | odroczony |
| 007 | Transport na `fetch` (`shared/api/backend.ts`) zamiast axios; błędy `HttpError` / `NetworkError` | wdrożony |

Przed zmianą w tych obszarach przeczytaj pełny ADR w `docs/ARCHITECTURAL_DECISIONS.md` (jeśli jest na dysku).

## Backend API

- **Przed hookiem / widokiem dotykającym API potwierdź realny kształt odpowiedzi** (curl na
  `https://shiftflow-api.duckdns.org` albo lokalnie) — opakowanie `{ data }` vs paginacja, pola, kody błędów.
  Nie ufaj na słowo README backendu ani `docs/BACKEND_API.md`; zweryfikowany kontrakt dopisz tam z datą.
- Curl zawsze z `-H 'Accept: application/json'` — bez tego niezalogowane `/api/*` zwraca `500` zamiast `401`.
- Logowanie: limit 5 prób/min z IP (`429`).

## Pułapki

- **Utility kolorów powtarzają prefiks tokena:** `--color-bg-card` → `bg-bg-card`, `--color-text-primary` →
  `text-text-primary`. `bg-card` nie generuje niczego, bez błędu. Lista: `themeColors` w `shared/lib/helpers/cn.ts`.
- Na elementach animowanych przez Motion nie używaj klas `transform` — Motion je nadpisuje (centrowanie: `left`/`calc`).

## Infrastruktura

- Front: `https://shiftflow.duckdns.org` (statyczny `dist/`, `/api/*` proxowane). Backend:
  `https://shiftflow-api.duckdns.org` (Laravel w Dockerze). Serwer: `ssh shiftflow` (alias w `~/.ssh/config`).
- Deploy obu repo automatyczny z CI przy pushu do `main`. Awaryjnie, logi, rollback: `docs/SERVER.md`.

## Dokumentacja (`docs/`, gitignorowana — może nie istnieć na tym komputerze)

- `claude_code_base_prompt.md` — stan sesji, bieżący branch/task (bywa nieaktualny — weryfikuj z `git log`).
- `IMPLEMENTATION_GUIDE.md` — kolejność tasków, zakres, konwencje commitów.
- `Details/PLAN_part2_components_views.md` — API, zachowanie, edge case'y komponentów i widoków.
- `Details/DESIGN.md` — design system; sekcja „Known intentional deviations” przed zgłoszeniem niezgodności stylu.
- `BACKEND_API.md`, `ARCHITECTURAL_DECISIONS.md`, `SERVER.md` (jedyne źródło prawdy o serwerze, oba repo).
- Przeczytaj właściwy dokument przed taskiem. Stare wersje planów → `docs/archive/`, nie w treści głównego
  dokumentu. Nie proponuj commitowania `docs/`.
