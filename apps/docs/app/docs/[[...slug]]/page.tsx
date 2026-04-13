import { readFile } from 'node:fs/promises';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { CopyMarkdownButton } from '../../../components/copy-markdown-button';
import { source } from '../../../lib/source';
import { getMDXComponents } from '../../../mdx-components';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // Read the raw .mdx from disk so the copy-markdown button can hand the
  // original source (frontmatter + body) to AI assistants without a fetch.
  // This runs once per page at build time — no runtime IO.
  let rawMarkdown = '';
  if (page.file.absolutePath) {
    try {
      rawMarkdown = await readFile(page.file.absolutePath, 'utf-8');
    } catch {
      rawMarkdown = '';
    }
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {rawMarkdown ? (
        <div className="mt-4 mb-6 flex justify-start">
          <CopyMarkdownButton source={rawMarkdown} />
        </div>
      ) : null}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
