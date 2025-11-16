# Avro Wiki - Knowledge Base with Next.js

An Obsidian-compatible wiki built with Next.js, featuring a tree-based sidebar navigation and full markdown support.

![Wiki Homepage](https://github.com/user-attachments/assets/00748dd1-d981-475d-b8d1-161a38e1ef45)

## Features

- **Obsidian Markdown Support**: Use `[[wiki links]]` to create connections between pages
- **Tree-based Navigation**: Collapsible folder structure in the sidebar for easy browsing
- **Markdown Rendering**: Full support for markdown formatting with GitHub Flavored Markdown
- **Responsive Design**: Works seamlessly on all devices
- **Static Site Generation**: Fast page loads with Next.js SSG
- **TypeScript**: Fully typed codebase for better developer experience

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── wiki/[[...slug]]/  # Dynamic wiki pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Sidebar.tsx       # Sidebar navigation
│   └── TreeView.tsx      # Collapsible tree view
├── lib/                  # Utility functions
│   └── wiki.ts          # Wiki content management
└── wiki/                # Wiki content (Markdown files)
    ├── index.md
    ├── getting-started/
    ├── guides/
    └── reference/
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the wiki.

### Build

Create a production build:

```bash
npm run build
```

### GitHub Pages Deployment

Set `GITHUB_PAGES=true` when building so the site uses the repository base path and asset prefix required by GitHub Pages. The CI workflow applies this flag automatically and copies the raw markdown sources into `out/wiki-source` (including a `wiki.tar.gz` archive) so the published site always ships with the original `.md` files.

```bash
GITHUB_PAGES=true npm run build
npx serve out
```

### Start Production Server

```bash
npm start
```

## Adding Wiki Content

### Creating Pages

1. Add markdown files (`.md`) to the `wiki/` directory
2. Use folders to organize content hierarchically
3. Add frontmatter metadata (optional):

```markdown
---
title: Page Title
description: Page description
---

# Page Content

Your content here...
```

### Using Obsidian-style Wiki Links

Link to other pages using double brackets:

```markdown
[[page-name]]                          # Link to page
[[folder/page-name]]                   # Link to nested page
[[page-name|Custom Link Text]]         # Link with custom text
```

### Folder Structure

The sidebar automatically reflects your folder structure:

```
wiki/
├── index.md                 # Homepage
├── getting-started/
│   └── introduction.md     # Appears under "getting-started" folder
├── guides/
│   └── how-to-use.md      # Appears under "guides" folder
└── reference/
    └── api.md             # Appears under "reference" folder
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **remark** - Markdown processing
- **remark-wiki-link** - Obsidian-style wiki links support
- **gray-matter** - Frontmatter parsing

## Screenshots

### Homepage with Sidebar
![Wiki Homepage](https://github.com/user-attachments/assets/00748dd1-d981-475d-b8d1-161a38e1ef45)

### Wiki Page
![Wiki Page](https://github.com/user-attachments/assets/228ad8f1-1422-49bb-916c-e580a0bb5744)

### Collapsible Navigation
![Collapsed Folder](https://github.com/user-attachments/assets/48c9a815-82a6-4e40-ae20-b99cda6bdec4)

## License

MIT

