# PT Stories

A free, desktop-focused interactive graded reader for learners of European Portuguese.

## Current stage

**Step 2: structural foundation**

This version establishes the reusable website shell before real story content and quiz logic are added.

### Included in the foundation

- dependency-free static HTML, CSS and JavaScript for Cloudflare Pages
- homepage with a brief explanation and reading-focused A2, B1 and B2 descriptions
- collapsible desktop sidebar organized by level and category
- category library routes with alphabetical vertical story lists
- reusable story-page layout with reading text on the left and learning tools on the right
- structural placeholders for questions during reading and the final quiz
- progress-page structure
- muted Portuguese-inspired visual system using icons rather than story images
- hash-based routing so direct navigation remains compatible with static hosting

### Intentionally not included yet

- real story text
- vocabulary entries and clickable words
- exercise behaviour and answer checking
- scoring and the 75% completion rule
- saved browser progress
- result copying, email or PDF generation

These belong to later development stages and should not be added until the structural foundation is approved.

## File structure

```text
index.html
404.html
assets/
  css/
    styles.css
  data/
    site-data.js
  js/
    app.js
```

Story metadata is kept separately in `assets/data/site-data.js`, so future stories can be added as data rather than as manually duplicated pages.
