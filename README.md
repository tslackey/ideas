# ideas

A small workshop of HTML, CSS, and JavaScript playthings.

Open `index.html` (or serve the repo root) to browse the catalog. Each idea is its own page. There is no build step — the site is static and GitHub Pages friendly.

## How to add a new idea

1. **Make a folder** under `ideas/` named with a short slug:

   ```
   ideas/my-new-toy/index.html
   ```

2. **Start from the shared chrome.** Link `../../css/idea.css` and keep a back-link to the catalog:

   ```html
   <link rel="stylesheet" href="../../css/idea.css" />
   <nav class="idea-bar">
     <a href="../../">← ideas</a>
     <span class="toy-name">My New Toy</span>
   </nav>
   ```

   Put the rest of the toy in that same `index.html` (inline CSS/JS is fine). Keep it self-contained so it can be opened on its own.

3. **List it in the catalog.** Append an entry to `js/catalog.js`:

   ```js
   {
     slug: "my-new-toy",   // must match the folder name
     title: "My New Toy",
     blurb: "One or two sentences that say what it does.",
     date: "2026-09-26",   // YYYY-MM-DD, used for newest-first sorting
     tag: "sketch",        // optional, shown next to the date
   }
   ```

4. Refresh the homepage. The new card should appear with a link to `ideas/my-new-toy/`.

That is the whole pattern: one folder, one catalog entry.

## Layout

```
index.html                 Catalog (the site home)
css/site.css               Homepage styles
css/idea.css               Shared bar for individual toys
js/catalog.js              The list of ideas
js/home.js                 Renders the catalog
ideas/<slug>/index.html    One self-contained toy per folder
.github/workflows/pages.yml  GitHub Pages deploy
```

## Local preview

Any static server from the repo root works, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`. Opening `index.html` as a file also works.

## GitHub Pages

The site is plain static files at the repo root. A workflow in `.github/workflows/pages.yml` uploads those files and deploys them with `actions/upload-pages-artifact` and `actions/deploy-pages`.

There is no build step. Pull requests upload a Pages artifact so the workflow can be checked; a push to `main` is what publishes.

One-time repo settings (Scott):

1. **Settings → Pages → Source:** GitHub Actions (not “Deploy from a branch”).
2. Allow the `github-pages` environment if GitHub asks. The first successful deploy to `main` publishes the site, usually at `https://<user>.github.io/ideas/`.

## Hosting elsewhere

Any static host works. The homepage is `index.html`; toys live at `/ideas/<slug>/`.
