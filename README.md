# birthday-site

A cute little birthday surprise site with a cozy pastel vibe, mini story pages, and a soft background music toggle. It runs on Vite + React, and the actual page content lives in the static HTML files under `public/pages`.

## vibe check

This project is basically a digital birthday card / mini experience:

- landing page with a happy birthday intro
- love note pages
- personal memory / gallery section
- background music controls
- smooth sidebar navigation for switching between sections

## quick start

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the local URL shown in the terminal, usually something like:

   ```bash
   http://localhost:5173
   ```

## useful scripts

```bash
npm run dev
npm run build
npm run preview
```

- `npm run dev` = local dev mode
- `npm run build` = production build
- `npm run preview` = preview the built app locally

## where the magic lives

- `src/App.tsx` — main app shell and page switching
- `src/components/` — sidebar + logo UI pieces
- `public/pages/` — the actual story pages (.html)
- `public/assets/` — images, audio, and supporting files
- `public/pages/shared-audio.js` — global background music logic

## customising the site

### change the page content
Open the HTML files in `public/pages/` and edit the text, sections, images, and layout.

### swap the music
Edit the track list in `public/pages/shared-audio.js`:

```js
const tracks = {
  songs1: { src: '../assets/audio/songs1.mp3', label: 'Jaan ho meri' },
  songs2: { src: '../assets/audio/songs2.mp3', label: 'Khat' },
  // add more if you want
};
```

### change colors / style
The page styling is mostly in the HTML `<style>` blocks inside each page, plus shared styling in `public/pages/shared.css`.

## deploy it

When you’re ready:

```bash
npm run build
```

Then upload the generated `dist/` folder to your hosting provider.

## final note

This project is built to feel warm, personal, and a little extra cute. If you want the site to feel more “you”, just edit the text and assets and keep the vibe consistent.

You got this. Now go make it extra special.
