import { BellRing, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import ButtonLink from './ui/Button';
import Logo from './ui/Logo';
import { RichText } from './ui/SectionHeading';
import { Forward } from './ui/Toggles';
import PhoneFrame from './phone/PhoneFrame';
import { DashboardScreen } from './phone/screens';

export default function Hero() {
  const { t } = usePrefs();
  const h = t.hero;
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-cyan/20 blur-3xl dark:bg-cyan/15" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-navy/10 blur-3xl dark:bg-navy/60" />
      </div>

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* copy */}
        <div className="text-center lg:text-start">
          <div className="inline-flex rounded-3xl bg-white p-2 shadow-card ring-1 ring-navy/5">
            <Logo className="h-24 sm:h-28" priority />
          </div>

          <h1 className="mt-8 font-heading text-[2.6rem] font-black leading-[1.25] text-ink sm:text-6xl lg:text-[4.2rem]">
            <RichText value={h.title} />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl lg:mx-0">{h.subtitle}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <ButtonLink href="#showcase" icon={<Forward />} className="w-full sm:w-auto">
              {h.primary}
            </ButtonLink>
            <ButtonLink href="#features" variant="secondary" icon={<Sparkles size={18} />} className="w-full sm:w-auto">
              {h.secondary}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-ink/60 lg:justify-start">
            {h.audience.map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-cyan" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* phone mockup */}
        <div className="relative mx-auto flex justify-center">
          <div className="absolute inset-x-6 bottom-6 top-12 rounded-[3rem] bg-brand-gradient opacity-90 blur-[2px]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-1/2 h-[120%] -translate-y-1/2 rounded-full border-2 border-dashed border-cyan/25" aria-hidden="true" />

          <PhoneFrame label={h.phoneLabel} className="relative animate-float-slow">
            <DashboardScreen />
          </PhoneFrame>

          {/* floating cards */}
          <div className="absolute -right-2 top-20 hidden animate-float rounded-2xl bg-card p-3 shadow-card ring-1 ring-ink/5 sm:flex sm:items-center sm:gap-3 lg:-right-14">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success">
              <CheckCircle2 size={20} />
            </span>
            <div>
              <p className="text-xs text-ink/55">{h.paymentLogged}</p>
              <p className="font-heading text-sm font-extrabold text-ink" dir="ltr">
                +250 ₪
              </p>
            </div>
          </div>
          <div
            className="absolute -left-2 bottom-28 hidden animate-float rounded-2xl bg-card p-3 shadow-card ring-1 ring-ink/5 sm:flex sm:items-center sm:gap-3 lg:-left-12"
            style={{ animationDelay: '1.5s' }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 text-cyan">
              <TrendingUp size={20} />
            </span>
            <div>
              <p className="text-xs text-ink/55">{h.collectionRate}</p>
              <p className="font-heading text-sm font-extrabold text-ink">68%</p>
            </div>
          </div>
          <div
            className="absolute -left-4 top-6 hidden animate-float items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white shadow-card ring-1 ring-white/10 md:flex lg:-left-16"
            style={{ animationDelay: '3s' }}
          >
            <BellRing size={14} className="text-cyan" />
            {h.reminder}
          </div>
        </div>
      </div>
    </section>
  );
}
