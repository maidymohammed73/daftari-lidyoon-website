import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Benefits() {
  const { t } = usePrefs();
  const b = t.benefits;
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading id="benefits-title" align="start" eyebrow={b.eyebrow} title={b.title} description={b.description} />
          <Reveal className="mt-10 hidden rounded-3xl bg-brand-gradient p-[1px] lg:block">
            <div className="rounded-[calc(1.5rem-1px)] bg-card p-6">
              <p className="font-heading text-lg font-bold text-ink">{t.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{b.quoteText}</p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {b.items.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={i} delay={i * 90}>
              <article
                className={`h-full rounded-3xl bg-card p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:shadow-card hover:ring-cyan/30 ${
                  i % 2 ? 'sm:translate-y-8' : ''
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan/10 text-cyan">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink/65">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
