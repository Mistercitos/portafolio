# Portfolio — Christian Del Barco

A product-focused portfolio built with React and Tailwind, designed to present case studies and product narratives with a clear, senior UX.

## Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- React Router

## Highlights
- Bilingual routing: English (`/`) and Spanish (`/es`)
- Token-based design system (colors, surfaces, spacing)
- Consistent layouts for Home, Work, Case Studies, About, and Contact
- Motion system with reduced-motion support

## Getting Started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Scripts
- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Project Structure
```
src/
  components/        # Reusable UI components
  context/           # Language context
  i18n/              # Translation dictionaries
  motion/            # Motion tokens and helpers
  pages/             # Route-level pages
  styles/            # Tokens and global styles
```

## Localization
- English is the default.
- Spanish routes are prefixed with `/es`.
- Text lives in `src/i18n/en.js` and `src/i18n/es.js`.

## Notes
This project is intentionally minimal and focused on clarity, scannability, and product storytelling.
