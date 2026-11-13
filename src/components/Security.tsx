import { Lock, ShieldCheck } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Security() {
  const { t } = usePrefs();
  const s = t.security;
  return (
    <section id="security" aria-labelledby="security-title" className="bg-card py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Shield illustration */}
        <Reveal className="relative order-last mx-auto grid aspect-square w-full max-w-sm place-items-center lg:order-first">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan/25" aria-hidden="true" />
          <div className="absolute inset-10 rounded-full bg-brand-gradient-soft ring-1 ring-cyan/15" aria-hidden="true" />
          <div className="relative grid h-40 w-40 place-items-center rounded-[2.5rem] bg-brand-gradient text-white shadow-glow">
            <ShieldCheck size={84} strokeWidth={1.6} aria-hidden="true" />
          </div>
          {s.items.map(({ icon: Icon }, i) => {
            const pos = ['top-2 left-1/2 -translate-x-1/2', 'top-1/2 right-2 -translate-y-1/2', 'bottom-2 left-1/2 -translate-x-1/2', 'top-1/2 left-2 -translate-y-1/2'][i];
            return (
              <span
                key={i}
                className={`absolute ${pos} grid h-14 w-14 place-items-center rounded-2xl bg-card text-cyan shadow-card ring-1 ring-ink/5`}
                aria-hidden="true"
              >
                <Icon size={24} />
              </span>
            );
          })}
          <span className="absolute bottom-16 right-14 grid h-9 w-9 place-items-center rounded-full bg-navy text-white ring-4 ring-card" aria-hidden="true">
            <Lock size={15} />
          </span>
        </Reveal>

        <div>
          <SectionHeading id="security-title" align="start" eyebrow={s.eyebrow} title={s.title} description={s.description} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {s.items.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={i} delay={i * 90}>
                <article className="flex h-full gap-4 rounded-2xl bg-page p-5 ring-1 ring-ink/5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
