import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/** Navy section in both themes — it's the brand's signature surface. */
export default function HowItWorks() {
  const { t } = usePrefs();
  const h = t.how;
  return (
    <section id="how" aria-labelledby="how-title" className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#F5F9FF_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading id="how-title" tone="light" eyebrow={h.eyebrow} title={h.title} description={h.description} />

        <ol className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* connector line (desktop) */}
          <span
            className="absolute inset-x-[16%] top-10 hidden h-px border-t-2 border-dashed border-white/20 md:block"
            aria-hidden="true"
          />
          {h.steps.map(({ icon: Icon, title, description }, i) => (
            <Reveal as="li" key={i} delay={i * 140} className="relative text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-navy shadow-card">
                <Icon size={32} aria-hidden="true" />
                <span className="absolute -end-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-cyan font-heading text-sm font-black text-white ring-4 ring-navy">
                  {i + 1}
                </span>
              </div>
              <h3 className="mx-auto mt-7 max-w-[16rem] text-xl font-bold leading-snug text-white">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-white/70">{description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
