import type { ReactNode } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Home,
  Plus,
  Search,
  Users,
  Wallet,
} from 'lucide-react';
import { usePrefs } from '../../context/Preferences';

/*
 * Illustrative interface mockups — NOT real screenshots.
 * All names and amounts are sample data for presentation only.
 * The phone screen stays light in both site themes (fixed brand colors, not theme tokens),
 * while its text follows the selected language.
 */

const fmt = (n: number) => n.toLocaleString('en-US');
const money = (n: number) => `${fmt(n)} ₪`;

/* ---------- shared bits ---------- */

function ScreenHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-2">
      <div>
        {subtitle && <p className="text-[10px] text-navy/55">{subtitle}</p>}
        <p className="font-heading text-[15px] font-extrabold text-navy">{title}</p>
      </div>
      {action}
    </div>
  );
}

function IconBubble({ children }: { children: ReactNode }) {
  return <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-navy shadow-soft">{children}</span>;
}

function Avatar({ name, tone = 'navy' }: { name: string; tone?: 'navy' | 'cyan' }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
        tone === 'navy' ? 'bg-navy/10 text-navy' : 'bg-cyan/15 text-cyan'
      }`}
    >
      {name.charAt(0)}
    </span>
  );
}

type Status = 'paid' | 'partial' | 'due';
const statusCls: Record<Status, string> = {
  paid: 'bg-success/10 text-success',
  partial: 'bg-cyan/10 text-cyan',
  due: 'bg-navy/10 text-navy',
};

function StatusChip({ status }: { status: Status }) {
  const { t } = usePrefs();
  return (
    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${statusCls[status]}`}>{t.screens.status[status]}</span>
  );
}

function TabBar({ active }: { active: number }) {
  const { t } = usePrefs();
  const icons = [Home, Users, ClipboardList, BarChart3];
  return (
    <div className="absolute inset-x-3 bottom-5 flex items-center justify-around rounded-2xl bg-white py-2 shadow-card">
      {icons.map((Icon, i) => (
        <span key={i} className={`flex flex-col items-center gap-0.5 ${i === active ? 'text-cyan' : 'text-navy/40'}`}>
          <Icon size={15} strokeWidth={2.2} />
          <span className="text-[8px] font-bold">{t.screens.tabs[i]}</span>
        </span>
      ))}
    </div>
  );
}

function Fab() {
  return (
    <span className="absolute bottom-20 end-4 grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
      <Plus size={20} strokeWidth={2.6} />
    </span>
  );
}

/* ---------- 1. Dashboard ---------- */

export function DashboardScreen() {
  const { t } = usePrefs();
  const d = t.screens.dashboard;
  const names = t.screens.names;
  const bars = [38, 62, 45, 80, 55, 92, 70];
  const recent = [
    { name: names[0], note: d.cashPayment, amount: 250, in: true },
    { name: names[1], note: d.newDebt, amount: 480, in: false },
    { name: names[2], note: d.cashPayment, amount: 120, in: true },
  ];
  return (
    <div className="relative h-full">
      <ScreenHeader
        subtitle={d.greeting}
        title={d.title}
        action={
          <IconBubble>
            <Bell size={14} />
          </IconBubble>
        }
      />
      <div className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-4 text-white shadow-glow">
          <span className="absolute -end-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
          <p className="text-[10px] text-white/75">{d.totalDue}</p>
          <p className="mt-1 font-heading text-2xl font-extrabold">
            {fmt(12450)} <span className="text-sm">₪</span>
          </p>
          <div className="mt-3 flex gap-2 text-[9px]">
            <span className="rounded-lg bg-white/15 px-2 py-1">{d.customers}</span>
            <span className="rounded-lg bg-white/15 px-2 py-1">{d.growth}</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white p-3 shadow-soft">
            <span className="flex items-center gap-1 text-[9px] text-navy/55">
              <ArrowDownLeft size={11} className="text-success" /> {d.collected}
            </span>
            <p className="mt-1 font-heading text-sm font-extrabold text-navy">{money(3280)}</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-soft">
            <span className="flex items-center gap-1 text-[9px] text-navy/55">
              <ArrowUpRight size={11} className="text-cyan" /> {d.newDebts}
            </span>
            <p className="mt-1 font-heading text-sm font-extrabold text-navy">{money(1940)}</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-white p-3 shadow-soft">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-navy">{d.weekly}</span>
            <span className="text-navy/45">{d.last7}</span>
          </div>
          <div className="mt-2 flex h-14 items-end justify-between gap-1.5">
            {bars.map((h, i) => (
              <span key={i} className={`flex-1 rounded-md ${i === 5 ? 'bg-cyan' : 'bg-navy/15'}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <p className="mb-1.5 mt-3 text-[11px] font-bold text-navy">{d.recent}</p>
        <div className="space-y-1.5">
          {recent.map((r, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-soft">
              <Avatar name={r.name} tone={r.in ? 'cyan' : 'navy'} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-bold text-navy">{r.name}</p>
                <p className="text-[9px] text-navy/50">{r.note}</p>
              </div>
              <span className={`text-[10px] font-extrabold ${r.in ? 'text-success' : 'text-navy'}`} dir="ltr">
                {r.in ? '+' : '-'}
                {money(r.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} />
    </div>
  );
}

/* ---------- 2. Customers ---------- */

export function CustomersScreen() {
  const { t } = usePrefs();
  const c = t.screens.customers;
  const data: { balance: number; status: Status }[] = [
    { balance: 1250, status: 'partial' },
    { balance: 3480, status: 'due' },
    { balance: 0, status: 'paid' },
    { balance: 860, status: 'due' },
    { balance: 420, status: 'partial' },
    { balance: 0, status: 'paid' },
  ];
  return (
    <div className="relative h-full">
      <ScreenHeader
        subtitle={c.count}
        title={c.title}
        action={
          <IconBubble>
            <Users size={14} />
          </IconBubble>
        }
      />
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[10px] text-navy/40 shadow-soft">
          <Search size={13} /> {c.search}
        </div>
        <div className="mt-2.5 flex gap-1.5 text-[9px] font-bold">
          <span className="rounded-full bg-navy px-2.5 py-1 text-white">{c.filters[0]}</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-navy/60 shadow-soft">{c.filters[1]}</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-navy/60 shadow-soft">{c.filters[2]}</span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          {data.map((row, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-soft">
              <Avatar name={t.screens.names[i]} tone={i % 2 ? 'cyan' : 'navy'} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-bold text-navy">{t.screens.names[i]}</p>
                <p className="truncate text-[8.5px] text-navy/50">{c.lastTx[i]}</p>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] font-extrabold text-navy">{money(row.balance)}</span>
                <StatusChip status={row.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Fab />
      <TabBar active={1} />
    </div>
  );
}

/* ---------- 3. Debt records ---------- */

export function DebtsScreen() {
  const { t } = usePrefs();
  const d = t.screens.debts;
  const data: { amount: number; remaining: number; status: Status }[] = [
    { amount: 650, remaining: 650, status: 'due' },
    { amount: 900, remaining: 400, status: 'partial' },
    { amount: 300, remaining: 200, status: 'partial' },
    { amount: 240, remaining: 0, status: 'paid' },
  ];
  return (
    <div className="relative h-full">
      <div className="flex items-center gap-2 px-4 pb-3 pt-2">
        <IconBubble>
          <ChevronLeft size={14} className="rtl:rotate-180" />
        </IconBubble>
        <p className="font-heading text-[15px] font-extrabold text-navy">{d.title}</p>
      </div>
      <div className="px-4">
        <div className="rounded-2xl bg-white p-3 shadow-soft">
          <div className="flex items-center gap-2">
            <Avatar name={t.screens.names[0]} />
            <div className="flex-1">
              <p className="text-[11px] font-bold text-navy">{t.screens.names[0]}</p>
              <p className="text-[9px] text-navy/50">{d.since}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-paper py-2">
              <p className="text-[9px] text-navy/55">{d.total}</p>
              <p className="font-heading text-[13px] font-extrabold text-navy">{money(2090)}</p>
            </div>
            <div className="rounded-xl bg-cyan/10 py-2">
              <p className="text-[9px] text-navy/55">{d.remaining}</p>
              <p className="font-heading text-[13px] font-extrabold text-cyan">{money(1250)}</p>
            </div>
          </div>
        </div>

        <p className="mb-1.5 mt-3 text-[11px] font-bold text-navy">{d.recorded}</p>
        <div className="space-y-1.5">
          {data.map((row, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-2 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-navy">{d.items[i].item}</p>
                <StatusChip status={row.status} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[9px] text-navy/55">
                <span className="flex items-center gap-1">
                  <CalendarDays size={10} /> {d.items[i].date}
                </span>
                <span>
                  {d.amount} <b className="text-navy">{money(row.amount)}</b> · {d.remaining}{' '}
                  <b className="text-navy">{money(row.remaining)}</b>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Fab />
      <TabBar active={2} />
    </div>
  );
}

/* ---------- 4. Payment tracking ---------- */

export function PaymentsScreen() {
  const { t } = usePrefs();
  const p = t.screens.payments;
  const progress = 68;
  const r = 34;
  const c = 2 * Math.PI * r;
  const payments = [
    { name: t.screens.names[0], amount: 250 },
    { name: t.screens.names[2], amount: 120 },
    { name: t.screens.names[4], amount: 300 },
    { name: t.screens.names[5], amount: 540 },
  ];
  return (
    <div className="relative h-full">
      <ScreenHeader
        subtitle={p.month}
        title={p.title}
        action={
          <IconBubble>
            <Wallet size={14} />
          </IconBubble>
        }
      />
      <div className="px-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft">
          <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0 -rotate-90">
            <circle cx="42" cy="42" r={r} fill="none" stroke="#123B68" strokeOpacity="0.1" strokeWidth="9" />
            <circle
              cx="42"
              cy="42"
              r={r}
              fill="none"
              stroke="#00AEEF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress / 100)}
            />
          </svg>
          <div>
            <p className="text-[9px] text-navy/55">{p.rate}</p>
            <p className="font-heading text-xl font-extrabold text-navy">{progress}%</p>
            <p className="text-[9px] text-navy/55">
              {p.collected} <b className="text-success">{money(3280)}</b> {p.of} {money(4820)}
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-xl bg-navy px-3 py-2 text-white">
          <Bell size={13} className="shrink-0 text-cyan" />
          <p className="text-[9px]">
            {p.reminderPre} <b>{p.reminderBold}</b> {p.reminderPost}
          </p>
        </div>

        <p className="mb-1.5 mt-3 text-[11px] font-bold text-navy">{p.recent}</p>
        <div className="space-y-1.5">
          {payments.map((pay, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-soft">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                <CheckCircle2 size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-bold text-navy">{pay.name}</p>
                <p className="text-[9px] text-navy/50">{p.dates[i]}</p>
              </div>
              <span className="text-[10px] font-extrabold text-success" dir="ltr">
                +{money(pay.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={3} />
    </div>
  );
}
