Authoring Guide (Markdown)

- Manage all posts under `content/`.
- Recommended structure per post: one folder + one `index.md` file.
  - Example: `content/ai/transformers/index.md`
  - Put images inside `_images/` within the same folder.
  - Any directory starting with `_` is ignored for routing and the index.
- URLs mirror the folder path.
  - `content/ai/transformers/index.md` → `/ai/transformers`
- Use relative image paths from the post:
  - `![Alt](./_images/diagram.png)`
  - At runtime these resolve to `/media/...` automatically.
- Optional frontmatter at the top of the file:

```
---
title: Your Title
date: 2026-03-19
---
```

Style & layout
- The home page lists the `content/` folder tree.
- Pages use minimal, classic typography with good spacing.

Notes
- A tiny built-in Markdown renderer handles common syntax (headings, lists, links, images, code, blockquotes).
- Raw HTML blocks are also supported when separated as their own block. This is useful for custom image sizing, galleries, embeds, and figure layouts.

Example HTML block

```html
<figure class="media-frame" style="--frame-width: 34rem;">
  <img src="./_images/cover.jpg" alt="Cover image" />
  <figcaption>A narrower framed image.</figcaption>
</figure>
```

Scrollable gallery example

```html
<div class="gallery gallery--scroll">
  <img src="./_images/one.jpg" alt="One" />
  <img src="./_images/two.jpg" alt="Two" />
  <img src="./_images/three.jpg" alt="Three" />
</div>
```
