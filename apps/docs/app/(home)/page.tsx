import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-24">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-widest text-fd-muted-foreground">
          Uranus Technologies
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-fd-foreground md:text-5xl">
          A design system for Uranus.
        </h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          Tokens, foundations, components, and blocks built on shadcn/ui, Tailwind CSS v4, and
          Motion. Inspired by Carbon, Olist, Apple HIG, Fluent 2, Samsung One UI, and Wise.
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          Read the docs
        </Link>
        <Link
          href="/docs/components/button"
          className="inline-flex items-center justify-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-medium hover:bg-fd-accent"
        >
          Browse components
        </Link>
      </div>
    </main>
  );
}
