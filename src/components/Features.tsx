import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Features() {
  const { t } = usePrefs();
  const f = t.features;
  return (
    <section id="features" aria-labelledby="features-title" className="relative py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading id="features-title" eyebrow={f.eyebrow} title={f.title} description={f.description} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {f.items.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="group relative h-full overflow-hidden rounded-3xl bg-card p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:ring-cyan/30">
                <span
                  className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-cyan/5 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
                  <Icon size={26} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="absolute end-6 top-7 font-heading text-4xl font-black text-ink/[0.06]" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="relative mt-6 text-xl font-bold text-ink">{title}</h3>
                <p className="relative mt-3 leading-relaxed text-ink/65">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
