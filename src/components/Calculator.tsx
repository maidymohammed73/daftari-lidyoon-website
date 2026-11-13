import { useId, useState, type FormEvent } from 'react';
import { CircleDollarSign, PartyPopper, Plus, RotateCcw, Trash2, User } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/**
 * Keeps only a valid decimal number and converts Arabic-Indic / Persian digits (٠-٩ / ۰-۹)
 * and the Arabic decimal separator (٫) to Latin — so Arabic keyboards work too.
 * (We use text inputs instead of type="number", which browsers localize to the OS digit style.)
 */
function normalizeNumber(raw: string) {
  const latin = raw
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٫,]/g, '.')
    .replace(/[^\d.]/g, '');
  const [int, ...dec] = latin.split('.');
  return dec.length ? `${int}.${dec.join('').slice(0, 2)}` : int;
}

const inputCls =
  'h-12 w-full rounded-xl bg-card px-4 font-heading font-bold text-ink ring-1 ring-ink/10 transition placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-cyan';

export default function Calculator() {
  const { t } = usePrefs();
  const c = t.calculator;
  const id = useId();

  const [customer, setCustomer] = useState('');
  const [debt, setDebt] = useState('1000');
  const [paymentInput, setPaymentInput] = useState('');
  const [payments, setPayments] = useState<number[]>([250]);
  const [error, setError] = useState(false);

  const total = Math.max(parseFloat(debt) || 0, 0);
  const paid = payments.reduce((s, p) => s + p, 0);
  const remaining = Math.max(total - paid, 0);
  const over = paid - total;
  const pct = total > 0 ? Math.min(paid / total, 1) * 100 : 0;
  const done = total > 0 && paid >= total;

  const addPayment = (e: FormEvent) => {
    e.preventDefault();
    const v = parseFloat(paymentInput);
    if (!v || v <= 0) {
      setError(true);
      return;
    }
    setPayments((p) => [...p, v]);
    setPaymentInput('');
    setError(false);
  };

  const reset = () => {
    setCustomer('');
    setDebt('');
    setPaymentInput('');
    setPayments([]);
    setError(false);
  };

  const r = 52;
  const circ = 2 * Math.PI * r;

  return (
    <section id="calculator" aria-labelledby="calc-title" className="bg-card py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading id="calc-title" eyebrow={c.eyebrow} title={c.title} description={c.description} />

        <Reveal className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-3xl bg-page p-6 ring-1 ring-ink/5 sm:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor={`${id}-customer`} className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <User size={16} className="text-cyan" aria-hidden="true" /> {c.customer}
                </label>
                <input
                  id={`${id}-customer`}
                  className={inputCls}
                  value={customer}
                  placeholder={c.defaultCustomer}
                  onChange={(e) => setCustomer(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor={`${id}-debt`} className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <CircleDollarSign size={16} className="text-cyan" aria-hidden="true" /> {c.debt} ({c.currency})
                </label>
                <input
                  id={`${id}-debt`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  className={inputCls}
                  value={debt}
                  placeholder="0"
                  onChange={(e) => setDebt(normalizeNumber(e.target.value))}
                  dir="ltr"
                />
              </div>

              <form onSubmit={addPayment} noValidate>
                <label htmlFor={`${id}-pay`} className="mb-2 block text-sm font-bold text-ink">
                  {c.payment} ({c.currency})
                </label>
                <div className="flex gap-2">
                  <input
                    id={`${id}-pay`}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    className={`${inputCls} ${error ? 'ring-2 ring-red-500/70' : ''}`}
                    value={paymentInput}
                    placeholder="0"
                    onChange={(e) => {
                      setPaymentInput(normalizeNumber(e.target.value));
                      setError(false);
                    }}
                    aria-invalid={error}
                    aria-describedby={error ? `${id}-err` : undefined}
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-xl bg-brand-gradient px-5 font-heading text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5"
                  >
                    <Plus size={18} aria-hidden="true" /> {c.add}
                  </button>
                </div>
                {error && (
                  <p id={`${id}-err`} role="alert" className="mt-2 text-sm font-bold text-red-500">
                    {c.invalid}
                  </p>
                )}
              </form>

              <div>
                <p className="mb-2 text-sm font-bold text-ink">{c.payments}</p>
                {payments.length === 0 ? (
                  <p className="rounded-xl bg-card px-4 py-3 text-sm text-ink/50 ring-1 ring-ink/5">{c.noPayments}</p>
                ) : (
                  <ul className="max-h-44 space-y-2 overflow-y-auto pe-1">
                    {payments.map((p, i) => (
                      <li key={i} className="flex items-center justify-between rounded-xl bg-card px-4 py-2.5 ring-1 ring-ink/5">
                        <span className="text-sm text-ink/60">#{i + 1}</span>
                        <span className="font-bold text-success" dir="ltr">
                          +{fmt(p)} {c.currency}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPayments((list) => list.filter((_, j) => j !== i))}
                          className="grid h-8 w-8 place-items-center rounded-lg text-ink/40 transition hover:bg-red-500/10 hover:text-red-500"
                          aria-label={`${c.remove} #${i + 1}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col rounded-3xl bg-navy p-6 text-white shadow-card ring-1 ring-white/10 sm:p-8" aria-live="polite">
            <p className="font-heading text-lg font-bold">{customer.trim() || c.defaultCustomer}</p>

            <div className="mt-6 flex items-center gap-6">
              <svg width="128" height="128" viewBox="0 0 128 128" className="shrink-0 -rotate-90" aria-hidden="true">
                <circle cx="64" cy="64" r={r} fill="none" stroke="#F5F9FF" strokeOpacity="0.12" strokeWidth="12" />
                <circle
                  cx="64"
                  cy="64"
                  r={r}
                  fill="none"
                  stroke={done ? '#10B981' : '#00AEEF'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct / 100)}
                  className="transition-[stroke-dashoffset] duration-700 ease-out"
                />
              </svg>
              <div>
                <p className="text-sm text-white/65">{c.progress}</p>
                <p className="font-heading text-4xl font-black" dir="ltr">
                  {Math.round(pct)}%
                </p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { label: c.total, value: total, cls: 'text-white' },
                { label: c.paid, value: paid, cls: 'text-success' },
                { label: c.remaining, value: remaining, cls: 'text-cyan' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 px-2 py-4">
                  <dt className="text-xs text-white/65">{s.label}</dt>
                  <dd className={`mt-1 font-heading text-lg font-extrabold sm:text-xl ${s.cls}`} dir="ltr">
                    {fmt(s.value)}
                  </dd>
                </div>
              ))}
            </dl>

            {done && (
              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-success/15 px-4 py-3 font-bold text-success">
                <PartyPopper size={18} aria-hidden="true" />
                {c.fullyPaid}
                {over > 0 && (
                  <span className="text-sm font-normal text-white/75">
                    — {c.overpaid} {fmt(over)} {c.currency}
                  </span>
                )}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between gap-3 pt-8">
              <p className="text-xs text-white/50">{c.note}</p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-white/80 ring-1 ring-white/20 transition hover:bg-white/10"
              >
                <RotateCcw size={15} aria-hidden="true" /> {c.reset}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
