# Animato – Frontend Test Page

Jednostránková statická stránka postavená podle Figma. Obsahuje header s dropdownem, hero sekce, FAQ s harmonikami a grid pro týmovou sekci.

## Tech stack

- **HTML5** – sémantická struktura
- **SCSS** – BEM metodika, proměnné v `abstracts/variables.scss`
- **Gulp** – kompilace SCSS, kopírování JS, Browser Sync
- **Vanilla JS** – dropdown v headeru, accordion v FAQ
- **Alpine.js** – poslední FAQ item (demonstrace)

## Požadavky

- **Node.js**
- **npm**

## Instalace

```bash
npm install
```

## Skripty

| Příkaz | Popis |
|--------|--------|
| `npm run dev` | Spustí Gulp: zkompiluje SCSS a JS, spustí Browser Sync a sleduje změny |
| `npm run build` | Produkční build: zkompiluje a zminifikuje CSS, zkopíruje JS |

Pro vývoj spusť `npm run dev`, otevři v prohlížeči adresu, kterou vypíše Gulp (obvykle `http://localhost:3000`). Po úpravě SCSS nebo JS se stránka automaticky obnoví.

**Důležité:** Po každé změně v `src/scss/` je potřeba znovu zkompilovat styly (při `npm run dev` to dělá Gulp automaticky). Bez úspěšného buildu se změny neprojeví v `dist/css/main.css` ani v prohlížeči.

## Struktura projektu

```
animato/
├── index.html              # Hlavní stránka
├── gulpfile.js             # Gulp: styly, skripty, watch, Browser Sync
├── package.json
├── images/                 # Obrázky a ikony (logo, hero, tým, SVG ikony)
├── src/
│   ├── scss/
│   │   ├── main.scss       # Vstupní soubor – importy
│   │   ├── abstracts/      # Proměnné
│   │   ├── base/           # Reset, typografie
│   │   ├── layout/         # Header, hero, grid, container, FAQ
│   │   └── components/     # Tlačítka
│   └── js/
│       ├── main.js         # Header dropdown (Resources)
│       └── accordion-vanilla.js  # FAQ accordion
└── dist/                   # Výstup buildu (CSS, JS) – generuje Gulp
    ├── css/
    └── js/
```

## Sekce stránky

- **Header** – logo, navigace (Home, Products, Resources, Pricing), dropdown Resources (About us, Press, Careers, Legal), Log in / Sign up
- **Hero** – dvě sekce (text + obrázek), na mobilu obrázek nahoře, obsah pod ním
- **FAQ** – accordion (vanilla JS + jeden item s Alpine.js)
- **Grid** – týmové karty (desktop: mřížka, mobil: jeden seznam v daném pořadí včetně Johnny Bell)

## Breakpointy (variables)

- `$bp-sm`: 480px  
- `$bp-md`: 768px  
- `$bp-lg`: 1024px  
- `$bp-xl`: 1280px  

## Zobrazení stránky
- **https://tobiaslicek.github.io/Test-Frontend-Animato/**