import { FileText, Info } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import { Forward } from './ui/Toggles';
import { url } from '../lib/paths';

export type LegalKind = 'privacy' | 'terms';

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const { t } = usePrefs();
  const l = t.legal;
  const doc = l[kind];
  const other: LegalKind = kind === 'privacy' ? 'terms' : 'privacy';

  return (
    <article className="relative pb-24 pt-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-brand-gradient-soft" aria-hidden="true" />
      <div className="container-x relative max-w-3xl">
        <a href={url()} className="inline-flex items-center gap-2 text-sm font-bold text-cyan hover:underline">
          <span className="rotate-180">
            <Forward size={16} />
          </span>
          {l.back}
        </a>

        <header className="mt-8">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
            <FileText size={26} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-4xl font-black text-ink sm:text-5xl">{doc.title}</h1>
          <p className="mt-3 text-sm font-bold text-ink/50">{l.updated}</p>
        </header>

        <p className="mt-8 flex gap-3 rounded-2xl bg-cyan/10 p-4 text-sm leading-relaxed text-ink/80 ring-1 ring-cyan/20">
          <Info size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
          {l.draftNotice}
        </p>

        <p className="mt-8 text-lg leading-relaxed text-ink/75">{doc.intro}</p>

        <ol className="mt-10 space-y-5">
          {doc.sections.map((s, i) => (
            <li key={i} className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-ink/5 sm:p-7">
              <h2 className="flex items-center gap-3 text-xl font-bold text-ink">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan/10 font-heading text-sm font-black text-cyan">
                  {i + 1}
                </span>
                {s.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-ink/70">{s.body}</p>
            </li>
          ))}
        </ol>

        <a
          href={url(other)}
          className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-card px-5 py-3 font-bold text-ink shadow-soft ring-1 ring-ink/5 transition hover:ring-cyan/40"
        >
          {other === 'privacy' ? l.privacyLink : l.termsLink}
          <Forward size={16} />
        </a>
      </div>
    </article>
  );
}
