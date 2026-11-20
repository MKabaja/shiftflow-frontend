---
paths:
  - "src/routes/**"
  - "src/app/router.ts"
  - "src/layouts/**"
  - "src/features/auth/lib/**"
---

# Routing (TanStack Router, file-based)

- Drzewo generuje plugin Vite (`tanstackRouter`, `autoCodeSplitting`) do `src/routeTree.gen.ts`. Plik generowany:
  nie edytuj, commituj razem ze zmienionym route'em.
- Generator działa tylko w `npm run dev` (i `vite build`) — przy pracy w `routes/` trzymaj `npm run dev` w tle.
  Route, którego nie ma w `routeTree.gen.ts`, daje błąd typów w `createFileRoute` (nie ciche 404).
- Nazwy w `routes/`: kebab-case = segment URL; `_nazwa` = pathless layout (bez segmentu w URL); `route.tsx` = layout
  folderu. Kropka w nazwie pliku to zagnieżdżenie, więc sufiksy typu `x.rola.ts` tu nie działają.
- Plik route'a: `export const Route = createFileRoute(…)` na górze, komponent pod spodem. Kod ekranów (logika
  w hookach, większe części jako komponenty) w `features/<f>/`; bez `-components/` w `routes/` i bez `features/*/pages/`.

```
__root                    kontekst: { queryClient }
├── _public               (AuthLayout)  guard: zalogowany → landingPathFor(user)
│   ├── /                 — landing (wybór roli)
│   ├── /login            — admin/manager, login + hasło
│   └── /login-pin        — pracownik, login + PIN
└── _authenticated        (AppLayout)   guard: brak usera → /; zwraca { user }
    ├── /settings                       — obie role
    ├── _employee-panel                 — moduł pracownika (bez guarda roli)
    │   ├── /home
    │   ├── /availability
    │   └── /my-schedule
    └── _manager-panel                  guard: employee → landingPathFor(context.user)
        ├── /schedule
        ├── /employees
        ├── /positions
        └── /news
```

## Kontekst routera

- `__root` deklaruje typ kontekstu (`createRootRouteWithContext`), instancję `queryClient` podaje `createRouter`
  w `src/app/router.ts`. W `beforeLoad` klient pochodzi z `context.queryClient` — `features/` nie importuje z `@/app`.
- Kontekst to obiekt z polami, nigdy sama instancja klasy: router łączy konteksty spreadem, metody z prototypu by
  zniknęły (TS tego nie złapie).
- `_authenticated` zwraca `{ user }`, więc dzieci czytają `context.user` (typ `User`, bez `null`) i nie pytają o
  usera ponownie. `_public` leży poza `_authenticated` i sam woła `getCurrentUser`.
- `context.user` to migawka z chwili nawigacji — tylko w `beforeLoad` / `loader`. Komponenty biorą usera z `useAuth`.

## Guardy

- `getCurrentUser(queryClient)`: `queryClient.query({ ...authQueries.currentUser(), staleTime: 'static' })` — request
  tylko przy pustym cache (`null` po 401 też jest danymi); każdy błąd → `null`. Async `beforeLoad` = sesja przeżywa F5.
  `ensureQueryData` jest deprecated, nie wracaj do niego.
- `landingPathFor(user)` jest **jedynym** miejscem decydującym o ekranie startowym: `/home` dla pracownika, `/schedule`
  dla pozostałych ról. Używają go formularze logowania (nawigacja w `onSuccess`) i guardy.
- Pathless `_authenticated` istnieje, bo `/settings` jest wspólne dla obu ról — `_manager-panel` i `_employee-panel`
  nie mają własnego `component`.
- Nawigacja: `Sidebar` (desktop) i `BottomNav` (mobile) czytają linki z `layouts/navigation/` (`navLinksFor`).
- `defaultPendingComponent: Splash`. Devtools routera tylko przy `config.isDev`.
