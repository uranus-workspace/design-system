import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col overflow-hidden">
      {/* Cosmic backdrop — mirrors the brand manual hero. */}
      <div aria-hidden className="bg-aurora absolute inset-0 -z-10" />

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-28 text-white md:py-40">
        <header className="flex flex-col gap-4">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-white/70">
            Uranus Technologies · Manual de Marca 2026
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            O sistema de design
            <br />
            do universo <span className="italic text-[#5dddfa]">Uranus</span>
          </h1>
          <p className="max-w-2xl font-sans text-lg text-white/80 md:text-xl">
            Tokens, foundations, componentes e blocos prontos para produção. Construídos sobre
            shadcn/ui, Tailwind CSS v4 e Motion — alinhados à paleta cósmica e à tipografia Poppins
            definidas pelo manual de marca da{' '}
            <a
              href="https://uranus.com.br"
              className="underline decoration-[#5dddfa]/60 underline-offset-4 hover:decoration-[#5dddfa]"
            >
              uranus.com.br
            </a>
            .
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-md bg-[#5dddfa] px-6 py-3 font-sans text-sm font-semibold text-[#000328] transition hover:bg-[#7be6ff]"
          >
            Ler a documentação
          </Link>
          <Link
            href="/docs/components/button"
            className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explorar componentes
          </Link>
          <a
            href="https://uranus.com.br"
            className="inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 font-sans text-sm font-semibold text-white/80 transition hover:text-white"
          >
            uranus.com.br →
          </a>
        </div>

        <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-10 font-sans text-sm md:grid-cols-4">
          <div>
            <dt className="text-white/60">Azul Profundo</dt>
            <dd className="font-mono text-white">#000328</dd>
          </div>
          <div>
            <dt className="text-white/60">Azul Marinho</dt>
            <dd className="font-mono text-white">#082d71</dd>
          </div>
          <div>
            <dt className="text-white/60">Azul Turquesa</dt>
            <dd className="font-mono text-[#5dddfa]">#5dddfa</dd>
          </div>
          <div>
            <dt className="text-white/60">Lilás Claro</dt>
            <dd className="font-mono text-[#f8ddfc]">#f8ddfc</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
