---
paths:
  - "src/routes/**"
  - "src/layouts/**"
  - "src/shared/lib/config/router.ts"
  - "src/features/auth/lib/**"
---

# Routing (TanStack Router, code-based)

Każdy plik w `src/routes/` ręcznie woła `createRoute({ getParentRoute })`, a drzewo jest składane ręcznie
w `shared/lib/config/router.ts`. **Nowy route bez wpisu w drzewie = ciche 404** — nie złapie tego ani TS, ani lint.

```
__root
├── _public          (AuthLayout)  guard: zalogowany → landingPathFor(user)
│   ├── /            — landing (wybór roli)
│   ├── /login       — admin/manager, login + hasło
│   └── /login-pin   — pracownik, login + PIN
└── _app             (AppLayout)   guard: brak usera → /
    ├── /settings                  — obie role
    ├── _disposition               — moduł pracownika (bez guarda roli)
    │   ├── /home
    │   ├── /availability
    │   └── /my-schedule
    └── _panel                     guard: employee → landingPathFor(user)
        ├── /schedule
        ├── /employees
        ├── /positions
        └── /news
```

- Guardy w `beforeLoad`, user przez `getCurrentUser()` (`ensureQueryData` na `auth.me`; każdy błąd, także 401 → `null`).
  Async `beforeLoad` = sesja przeżywa F5.
- `landingPathFor(user)` jest **jedynym** miejscem decydującym o ekranie startowym: `/home` dla pracownika, `/schedule`
  dla pozostałych ról. Używają go mutacje logowania i guardy.
- Pathless `_app` istnieje, bo `/settings` jest wspólne dla obu ról — `_panel` i `_disposition` nie mają własnego
  `component`, tylko warunek roli.
- Nawigacja: `Sidebar` (desktop) i `BottomNav` (mobile) czytają linki z `layouts/navigation/` (`navLinksFor`).
- `defaultPendingComponent: Splash`. Devtools routera tylko przy `config.isDev`.
- Planowana migracja na file-based (ADR-006) osobnym branchem — nie proponuj jej przy innych zadaniach.
