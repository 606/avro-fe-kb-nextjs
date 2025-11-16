---
title: Authoring Content
description: Step-by-step guide for adding rich markdown pages
---

# Authoring Content

Use this guide when you need to add a new article to the Avro Wiki and want it to look great.

## 1. Create the file

Pick the folder that fits your topic and add a `.md` file. For example:

```
wiki/
  guides/
    authoring-content.md
```

## 2. Add frontmatter

Frontmatter powers the title, description, and sidebar metadata.

```markdown
---
title: Authoring Content
description: Step-by-step guide for adding rich markdown pages
---
```

## 3. Structure the page

Use headings to create a logical outline. Short paragraphs and bullet lists keep the content scannable.

## 4. Embed code and tips

````markdown
```tsx
export function Example() {
  return <p>Hello wiki!</p>;
}
```
````

> **Tip:** Use callouts, quotes, and tables to highlight critical information.

## 5. Link related topics

Cross-link pages with wiki links so readers can keep exploring:

- [[getting-started/introduction]]
- [[reference/api]]
- [[reference/glossary|Glossary]]

## 6. Preview locally

Run `npm run dev` and open the page in your browser to confirm layout and links before pushing.
