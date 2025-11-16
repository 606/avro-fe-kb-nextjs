import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import wikiLinkPlugin from 'remark-wiki-link';

const wikiDirectory = path.join(process.cwd(), 'wiki');

export interface WikiPage {
  slug: string;
  title: string;
  description?: string;
  content: string;
  htmlContent: string;
}

export interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

// Get all wiki pages recursively
export function getAllWikiPages(): string[] {
  const pages: string[] = [];
  
  function scanDirectory(dir: string, basePath: string = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, path.join(basePath, item));
      } else if (item.endsWith('.md')) {
        const slug = path.join(basePath, item.replace(/\.md$/, ''));
        pages.push(slug);
      }
    }
  }
  
  scanDirectory(wikiDirectory);
  return pages;
}

// Get wiki page by slug
export async function getWikiPage(slug: string): Promise<WikiPage | null> {
  try {
    const filePath = path.join(wikiDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process wiki links to convert them to Next.js links
    const processedContent = await remark()
      .use(gfm)
      .use(wikiLinkPlugin, {
        pageResolver: (name: string) => [name.toLowerCase().replace(/\s+/g, '-')],
        hrefTemplate: (permalink: string) => `/wiki/${permalink}`,
      })
      .use(html, { sanitize: false })
      .process(content);
    
    const htmlContent = processedContent.toString();
    
    return {
      slug,
      title: data.title || slug,
      description: data.description,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading wiki page ${slug}:`, error);
    return null;
  }
}

// Build tree structure for sidebar
export function getWikiTree(): TreeNode[] {
  function buildTree(dir: string, basePath: string = ''): TreeNode[] {
    const items = fs.readdirSync(dir);
    const nodes: TreeNode[] = [];
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      const itemPath = basePath ? `${basePath}/${item}` : item;
      
      if (stat.isDirectory()) {
        nodes.push({
          name: item,
          path: itemPath,
          type: 'folder',
          children: buildTree(fullPath, itemPath),
        });
      } else if (item.endsWith('.md')) {
        const name = item.replace(/\.md$/, '');
        const pagePath = basePath ? `${basePath}/${name}` : name;
        nodes.push({
          name,
          path: pagePath,
          type: 'file',
        });
      }
    }
    
    // Sort: folders first, then files, both alphabetically
    nodes.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    
    return nodes;
  }
  
  return buildTree(wikiDirectory);
}
