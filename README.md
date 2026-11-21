# Academic Research Portfolio

A responsive academic portfolio website for an urban planner / geospatial researcher. Built with plain HTML, CSS and JavaScript; no build tools or framework required.

## Files
- `index.html` — page structure and editable content
- `style.css` — responsive modern styling and dark theme
- `script.js` — navigation, theme switch, project filters, project details dialog and publication search

## Preview locally
Open `index.html` in a modern browser. Internet access is only needed for the optional Google Fonts.

## Personalise before publishing
Search and replace:
- `Your Name` / `ResearchPortfolio`
- `your.email@example.com`
- LinkedIn, GitHub and Google Scholar URLs
- Exact education, role names, dates and institution details
- Project descriptions, maps, repositories and outputs

The four GIS project cards are starter portfolio examples based on research themes, not claims of completed or published work. Update their status and descriptions to match your actual work.

## Add publications
Open `script.js` and add verified records to the `publications` array. Example:

```js
const publications = [
  {
    type: "journal",
    year: "2026",
    title: "Exact article title",
    authors: "Author A, Your Name, Author B",
    venue: "Journal Name, volume(issue), pages",
    doi: "https://doi.org/10.xxxx/xxxxx"
  }
];
```

Supported `type` values: `journal`, `conference`, `thesis`.

## Add your own project maps
In `index.html`, find each `.project-image` block. Replace the abstract CSS artwork with an image, for example:

```html
<div class="project-image">
  <img src="assets/your-map.jpg" alt="Land surface temperature map">
</div>
```

Then add an `assets` folder and upload your map images. Add this CSS if needed:

```css
.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Publish on GitHub Pages
1. Create a GitHub repository, e.g. `academic-portfolio`.
2. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for deployment. Your site URL will be shown in the Pages settings.

For a user site, create a repository named `YOUR-USERNAME.github.io`.
