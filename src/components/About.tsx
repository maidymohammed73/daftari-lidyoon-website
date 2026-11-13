import { BookX, CheckCircle2, ClipboardList, NotebookPen, Users, Wallet } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const pointIcons = [ClipboardList, Users, Wallet];

export default function About() {
  const { t } = usePrefs();
  const a = t.about;
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-card py-24 lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading id="about-title" align="start" eyebrow={a.eyebrow} title={a.title} description={a.description} />
          <ul className="mt-10 space-y-5">
            {a.points.map(({ title, text }, i) => {
              const Icon = pointIcons[i];
              return (
                <Reveal as="li" key={i} delay={i * 100} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient-soft text-cyan ring-1 ring-cyan/15">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-1 leading-relaxed text-ink/65">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Before → after illustration */}
        <Reveal className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-brand-gradient-soft" aria-hidden="true" />
          <div className="relative grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-page p-6 ring-1 ring-ink/5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-ink/50 shadow-soft">
                <BookX size={22} aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-lg font-bold text-ink/80">{a.before}</p>
              <ul className="mt-3 space-y-2.5 text-sm text-ink/55">
                {a.beforeItems.map((item) => (
                  <li key={item} className="line-through decoration-ink/30">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2" aria-hidden="true">
                <div className="h-2 w-4/5 -rotate-2 rounded bg-ink/10" />
                <div className="h-2 w-3/5 rotate-1 rounded bg-ink/10" />
                <div className="h-2 w-2/3 -rotate-1 rounded bg-ink/10" />
              </div>
            </div>

            <div className="rounded-3xl bg-navy p-6 text-white shadow-card ring-1 ring-white/10 sm:translate-y-8">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan text-white shadow-glow">
                <NotebookPen size={22} aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-lg font-bold">{a.after}</p>
              <ul className="mt-3 space-y-2.5 text-sm text-white/80">
                {a.afterItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-cyan" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-white/10 p-3">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>{a.progress}</span>
                  <span className="font-bold text-white">68%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[68%] rounded-full bg-cyan" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
