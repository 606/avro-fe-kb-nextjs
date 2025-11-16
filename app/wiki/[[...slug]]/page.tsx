import { getAllWikiPages, getWikiPage, getWikiTree } from '@/lib/wiki';
import { Sidebar } from '@/components/Sidebar';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const pages = getAllWikiPages();
  return pages.map((page) => ({
    slug: page.split('/'),
  }));
}

export default async function WikiPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'index';
  const page = await getWikiPage(slug);
  
  if (!page) {
    notFound();
  }
  
  const tree = getWikiTree();

  return (
    <div className="flex min-h-screen">
      <Sidebar tree={tree} currentPath={slug} />
      <main className="flex-1 p-8 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {page.description}
            </p>
          )}
          <div 
            className="wiki-content"
            dangerouslySetInnerHTML={{ __html: page.htmlContent }}
          />
        </article>
      </main>
    </div>
  );
}
