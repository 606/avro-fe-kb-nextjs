import { getAllWikiPages, getWikiPage, getWikiTree } from '@/lib/wiki';
import { notFound } from 'next/navigation';
import { WikiSidebar } from '@/components/WikiSidebar';
import { TopNav } from '@/components/TopNav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <div className="flex min-h-screen">
        <WikiSidebar tree={tree} currentPath={slug} />
        <SidebarInset>
          <TopNav />
          <main className="mx-auto w-full max-w-4xl space-y-8 px-6 py-8">
            <header className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                /wiki/{slug === 'index' ? '' : slug}
              </p>
              <h1 className="text-4xl font-bold leading-tight text-foreground">
                {page.title}
              </h1>
              {page.description && (
                <p className="text-lg text-muted-foreground">
                  {page.description}
                </p>
              )}
            </header>
            <article className="prose prose-neutral max-w-none dark:prose-invert">
              <div
                className="wiki-content"
                dangerouslySetInnerHTML={{ __html: page.htmlContent }}
              />
            </article>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
