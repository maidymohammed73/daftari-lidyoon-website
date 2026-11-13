import { useId, useState } from 'react';
import { MessageCircleQuestion, Plus } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ButtonLink from './ui/Button';
import { Forward } from './ui/Toggles';

export default function Faq() {
  const { t } = usePrefs();
  const f = t.faq;
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading id="faq-title" align="start" eyebrow={f.eyebrow} title={f.title} description={f.description} />
          <Reveal className="mt-8 hidden rounded-3xl bg-navy p-6 text-white shadow-card ring-1 ring-white/10 lg:block">
            <MessageCircleQuestion size={28} className="text-cyan" aria-hidden="true" />
            <p className="mt-3 leading-relaxed text-white/80">{t.contactForm.description}</p>
            <ButtonLink href="#contact" variant="light" size="md" icon={<Forward size={18} />} className="mt-5">
              {t.nav.contact}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal as="ul" className="space-y-3">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className={`rounded-2xl bg-card ring-1 transition ${isOpen ? 'shadow-card ring-cyan/30' : 'ring-ink/5'}`}>
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start font-heading text-lg font-bold text-ink sm:px-6"
                  >
                    {item.q}
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-cyan text-white' : 'bg-ink/5 text-ink/60'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className={`overflow-hidden ${isOpen ? '' : 'invisible'}`}>
                    <p className="px-5 pb-5 leading-relaxed text-ink/70 sm:px-6">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
