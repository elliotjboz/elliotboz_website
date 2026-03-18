# Elliot Boz Photography Portfolio

A static photography portfolio site. Open `index.html` in any browser to view — no server required.

## Adding Photos

Each category has its own folder inside `images/`:

| Category | Folder | Cover | Gallery images |
|----------|--------|-------|----------------|
| Australia and New Zealand | `images/australia/` | `cover.jpg` | `1.jpg` through `21.jpg` |
| Floral | `images/floral/` | `cover.jpg` | `1.jpg` through `21.jpg` |
| Landscape | `images/landscape/` | `cover.jpg` | `1.jpg` through `21.jpg` |
| Portrait | `images/portrait/` | `cover.jpg` | `1.jpg` through `21.jpg` |
| Vehicles | `images/vehicles/` | `cover.jpg` | `1.jpg` through `21.jpg` |
| Animals | `images/animals/` | `cover.jpg` | `1.jpg` through `21.jpg` |
| Food | `images/food/` | `cover.jpg` | `1.jpg` through `21.jpg` |

### Steps to add photos:

1. **Cover image**: Place a `cover.jpg` in the category folder. This appears as the tile on the homepage (displayed at 4:3 ratio).
2. **Gallery images**: Name them `1.jpg`, `2.jpg`, `3.jpg`, etc. The gallery pages reference images numbered 1 through 21.
3. **Blog images**: Place blog cover images in `images/blog/` (e.g., `crossroads.jpg`).

Missing images are hidden automatically — no broken image icons will appear.

### To add more than 21 photos to a category:

Edit the corresponding gallery HTML file (e.g., `australia.html`) and add more `<div class="gallery-item">` entries following the existing pattern.

### To add a new blog post:

1. Create a new HTML file in `blog/` (copy `the-crossroads.html` as a template)
2. Add a new `.blog-card` entry in `thoughts.html`
