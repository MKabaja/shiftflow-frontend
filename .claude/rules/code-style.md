---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Standard kodu (TS / React)

Pełny standard z przykładami: skill `react-clean-code`. Poniżej rdzeń + konwencje tego repo, które wygrywają ze skillem.

## TypeScript i moduły
- `tsconfig.app.json`: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `verbatimModuleSyntax` — nieużyte
  importy i parametry to błędy kompilacji; typy importuj przez `import type` / `type` w specyfikatorze.
- Rozszerzenia `.ts` / `.tsx` w importach są wymagane (`allowImportingTsExtensions`). Alias `@/` → `src/`.
- `type`, nie `interface` — `interface` tylko w augmentacji modułów (`declare module '…'`).
- Bez `any`, nieuzasadnionych `as`, `!`, `@ts-ignore`.
- Nazwane aliasy typów zamiast inline unii kluczy w `Pick` / `Omit` / `Record` i inline sygnatur.
- Mapy nazywane jak zdanie: `type LabelByStatus = Record<Status, string>`, `const labelByStatus: LabelByStatus`.
- Zamiast `switch` po unii — obiekt `Record<Stan, Handler>`. Stan przez discriminated union, nie kilka booleanów.
- Dane z zewnątrz (API, `localStorage`, URL) są niezaufane do walidacji w runtime. Stan: odpowiedzi API są dziś tylko
  typowane (`backend.get<T>`) — walidacja Zod to zaplanowany osobny branch; w nowym kodzie nie mieszaj stylów bez ustalenia.

## Funkcje i nazwy
- Deklaracje `function` (komponenty, hooki, helpery), nie `const f = () => {}`. Stepdown: główne API modułu na górze,
  helpery pod spodem.
- Funkcja = czasownik; boolean = `is` / `has` / `can` / `should`. Bez ogólnych nazw (`data`, `item`, `helper`).
  Nazwa zawiera jednostkę (`millisecondsSinceFetch`).
- 0–2 argumenty, max 3; więcej → obiekt. Bez argumentów flagowych. Guard clauses zamiast zagnieżdżeń.
- Decyzje (czyste funkcje) oddzielone od efektów. Czas i losowość przekazywane jako argumenty.
- Bez abstrakcji, klas i plików bez konkretnego powodu. Bez refaktoru kodu niezwiązanego z zadaniem.

## Komentarze i TSDoc
- **Bez komentarzy w kodzie** — wyjaśnienia idą do rozmowy / PR. Jedyny wyjątek: TSDoc na eksportowanym API (skill `tsdoc`).
- TSDoc bez odwołań do numerów ADR i wewnętrznych dokumentów.

## React
- Importy z Reacta nazwane (`import { useState, type ReactNode } from 'react'`), bez `React.`.
- Nie przechowuj w stanie tego, co da się obliczyć. `useEffect` tylko do synchronizacji z systemem zewnętrznym, z cleanup.
- Bez automatycznego `useMemo` / `useCallback` / `memo`; Context nie dla jednego propsa.
- Props: `variant` / `size` zamiast mnożenia booleanów; typ propsów w pliku komponentu.
- Teksty UI zawsze przez `t()`, nigdy na sztywno.

## Komponenty
- Folder na komponent: `Nazwa.tsx`, `Nazwa.styles.ts`, `index.ts`, `__tests__/Nazwa.test.tsx`
  (`shared/components/`, `layouts/components/`, komponenty feature'ów).
- Klasy Tailwinda w `Nazwa.styles.ts` (obiekty z nazwanymi typami `Record<Wariant, string>`), nie w TSX.
- Komponenty współdzielone wołają `t()` tylko dla stałych, uniwersalnych tekstów („Zamknij” w `Modal`); etykiety
  zależne od użycia (np. `Avatar.label`) przekazuje wywołujący.
