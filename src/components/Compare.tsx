import { Check, X } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Compare() {
  const { t } = usePrefs();
  const c = t.compare;
  return (
    <section aria-labelledby="compare-title" className="py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading id="compare-title" eyebrow={c.eyebrow} title={c.title} description={c.description} />

        <Reveal className="mx-auto mt-14 max-w-4xl overflow-x-auto rounded-3xl bg-card shadow-card ring-1 ring-ink/5">
          <table className="w-full min-w-[34rem] border-collapse text-start">
            <thead>
              <tr className="border-b border-ink/10">
                <th scope="col" className="px-5 py-5 text-start font-heading text-sm font-bold text-ink/50 sm:px-7">
                  {c.feature}
                </th>
                <th scope="col" className="px-4 py-5 text-center font-heading text-sm font-bold text-ink/60">
                  {c.paper}
                </th>
                <th scope="col" className="bg-cyan/[0.07] px-4 py-5 text-center">
                  <span className="inline-flex rounded-full bg-brand-gradient px-4 py-1.5 font-heading text-sm font-bold text-white shadow-glow">
                    {c.app}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={i} className="border-b border-ink/5 last:border-0">
                  <th scope="row" className="px-5 py-4 text-start font-bold text-ink sm:px-7">
                    {row.label}
                  </th>
                  <td className="px-4 py-4 text-center text-sm text-ink/55">
                    {row.paper === false ? (
                      <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-ink/5 text-ink/40">
                        <X size={16} aria-label="✗" />
                      </span>
                    ) : (
                      row.paper
                    )}
                  </td>
                  <td className="bg-cyan/[0.07] px-4 py-4 text-center text-sm font-bold text-ink">
                    {row.app === true ? (
                      <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-cyan text-white shadow-glow">
                        <Check size={16} strokeWidth={3} aria-label="✓" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        <Check size={16} strokeWidth={3} className="text-cyan" aria-hidden="true" />
                        {row.app}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
