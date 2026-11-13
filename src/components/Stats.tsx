import { useEffect, useRef, useState } from 'react';
import { usePrefs } from '../context/Preferences';

/** Counts up from 0 to `value` the first time it scrolls into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setN(value);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = usePrefs();
  return (
    <section aria-label={t.name} className="relative z-10 -mt-6 pb-4 lg:-mt-10">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 shadow-card ring-1 ring-ink/5 lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <li key={i} className="bg-card px-5 py-7 text-center sm:py-8">
              <p className="font-heading text-4xl font-black text-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold text-ink/65 sm:text-base">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
