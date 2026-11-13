import type { ComponentType } from 'react';
import { ClipboardList, Info, LayoutDashboard, MoveHorizontal, Users, Wallet, type LucideIcon } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import PhoneFrame from './phone/PhoneFrame';
import { CustomersScreen, DashboardScreen, DebtsScreen, PaymentsScreen } from './phone/screens';

const shots: { icon: LucideIcon; Screen: ComponentType }[] = [
  { icon: LayoutDashboard, Screen: DashboardScreen },
  { icon: Users, Screen: CustomersScreen },
  { icon: ClipboardList, Screen: DebtsScreen },
  { icon: Wallet, Screen: PaymentsScreen },
];

export default function Showcase() {
  const { t } = usePrefs();
  const s = t.showcase;
  return (
    <section id="showcase" aria-labelledby="showcase-title" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[80rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <div className="container-x relative">
        <SectionHeading id="showcase-title" eyebrow={s.eyebrow} title={s.title} description={s.description} />
        <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-bold text-ink/60 shadow-soft ring-1 ring-ink/5">
          <Info size={14} className="text-cyan" aria-hidden="true" />
          {s.disclaimer}
        </p>
      </div>

      {/* Scroll-snap carousel on small screens, full row on xl */}
      <div className="relative mt-14 overflow-x-auto pb-6 [scrollbar-width:none] xl:overflow-visible [&::-webkit-scrollbar]:hidden">
        <ul className="mx-auto flex w-max snap-x snap-mandatory gap-8 px-6 xl:w-auto xl:max-w-7xl xl:justify-between xl:px-8">
          {shots.map(({ icon: Icon, Screen }, i) => (
            <Reveal as="li" key={i} delay={i * 100} className={`snap-center ${i % 2 ? 'xl:mt-16' : ''}`}>
              <PhoneFrame label={`${s.phonePrefix} ${s.shots[i].title}`}>
                <Screen />
              </PhoneFrame>
              <div className="mt-6 flex items-start gap-3 px-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-ink">{s.shots[i].title}</h3>
                  <p className="max-w-[13rem] text-sm text-ink/60">{s.shots[i].caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-ink/45 xl:hidden" aria-hidden="true">
        <MoveHorizontal size={13} /> {s.swipe}
      </p>
    </section>
  );
}
