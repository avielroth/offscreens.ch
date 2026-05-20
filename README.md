# Custom 3D-Prints Website

Statische Website für ein kleines 3D-Druck-Business mit Vite, Tailwind CSS 4 und plain JavaScript.

## Starten

```bash
npm install
npm run dev
```

The dev server uses Vite with Tailwind 4, so changes to `index.html`, `src/styles.css`, and `src/main.js` refresh automatically.

## Build

```bash
npm run build
```

Der Build erzeugt ein sauberes `dist`-Verzeichnis für Netlify. Vite verarbeitet JavaScript, Tailwind CSS und die statischen Assets aus `public`.

## Netlify

Die Einstellungen stehen in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Netlify kann das Projekt dadurch direkt aus dem Repository bauen und `dist` veröffentlichen.

## Kontaktformular

Das Formular öffnet aktuell eine vorbereitete E-Mail an `aviel@yolu.ch`. Später kann hier ein Formular-Dienst oder ein kleiner Server für Formular-Handling angebunden werden.
