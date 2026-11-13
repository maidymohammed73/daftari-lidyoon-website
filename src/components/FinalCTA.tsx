import { usePrefs } from '../context/Preferences';
import Reveal from './ui/Reveal';
import StoreBadges from './ui/StoreBadges';

/** Final call to action — also the "#download" target of every "Start now" button. */
export default function FinalCTA() {
  const { t } = usePrefs();
  return (
    <section id="download" aria-labelledby="cta-title" className="py-24 lg:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-16 text-center shadow-card sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10" />
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#F5F9FF_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          </div>
          <div className="relative">
            <h2 id="cta-title" className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85 sm:text-xl">{t.cta.description}</p>
            <p className="mt-10 font-heading text-lg font-bold text-white">{t.cta.button}</p>
            <StoreBadges className="mt-4 justify-center" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
