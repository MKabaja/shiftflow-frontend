---
paths:
  - "src/css/**"
  - "src/**/*.styles.ts"
  - "src/**/*.tsx"
  - "src/shared/lib/styles/**"
  - "src/shared/lib/helpers/cn.ts"
---

# CSS / design system

Spec: `docs/Details/DESIGN.md` (jeśli jest na dysku) — najpierw sekcja „Known intentional deviations”. Przy review UI
sprawdzaj też zgodność z nim i z `docs/Details/PLAN_part2_components_views.md`, nie tylko logikę.

- Tailwind v4 konfigurowany wyłącznie w CSS, bez pliku JS. Wejście `css/Index.css`: `tailwindcss`, potem `theme.css`,
  `globals.css`, `helpers.css`, `animations.css`.
- `css/theme.css` — **wszystkie tokeny** w `@theme { … }`: kolory, cienie `--shadow-nm-*`, skala z-index
  (`--z-sidebar`, `--z-bottom-nav`, `--z-modal`), responsywna typografia. Listę sprawdzaj w pliku, nie zgaduj.
- `css/globals.css` — `@layer base`: reset, ciemny `color-scheme`, fonty, linki, inputy, `focus-visible`, zaznaczenie.
- Język wizualny: **ciemny neumorfizm**, akcent „Mining Gold” `--color-accent: #C9A347`, tło `#1E1E20`.
- Cienie tylko przez utility `shadow-nm-*`, nigdy surowy `box-shadow`.
- Fonty: Inter (`--font-body`) i Space Grotesk (`--font-display`). `h1`–`h6` i `th` dziedziczą `font-display`
  z `globals.css` — nie dodawaj go ręcznie.
- **Utility kolorów powtarzają prefiks tokena**: `bg-bg-card`, `text-text-primary`. `bg-card` / `text-primary` nie
  generują niczego, bez błędu. Autorytatywna lista: `themeColors` w `shared/lib/helpers/cn.ts`.
- Tokeny typografii (`text-display-*`, `text-body-*`, `text-label`) mają własne `line-height` i `font-weight` — nie
  łącz ich z `font-bold` / `leading-*`.
- Powtarzalne zestawy klas (focus ring, disabled, tekst błędu) → `shared/lib/styles/`, importowane do `*.styles.ts`.
  Nigdy nie kopiuj ich ręcznie.
- `cn()` tylko przy łączeniu kilku źródeł klas, nigdy na stałym stringu.
- Kolory z runtime (np. kolor stanowiska z API): Tailwind nie wygeneruje `bg-[#…]` w runtime → inline `style` albo
  zmienna CSS + `bg-(--var)`.
- Na elementach animowanych przez Motion (`layoutId`, `animate`) bez klas `transform` — centrowanie przez `left`/`calc`.
