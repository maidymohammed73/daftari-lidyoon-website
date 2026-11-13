import { useId, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { siteConfig } from '../data/content';
import { usePrefs } from '../context/Preferences';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const fieldCls =
  'w-full rounded-xl bg-card px-4 text-ink ring-1 ring-ink/10 transition placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-cyan';

type Status = 'idle' | 'sent' | 'notConnected';

export default function Contact() {
  const { t } = usePrefs();
  const c = t.contactForm;
  const id = useId();

  const [name, setName] = useState('');
  const [reach, setReach] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const nameErr = touched && !name.trim();
  const msgErr = touched && message.trim().length < 10;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || message.trim().length < 10) return;

    const text = `${c.name}: ${name.trim()}\n${reach.trim() ? `${c.reach}: ${reach.trim()}\n` : ''}\n${message.trim()}`;

    if (siteConfig.contactWhatsapp) {
      window.open(`https://wa.me/${siteConfig.contactWhatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setStatus('sent');
    } else if (siteConfig.contactEmail) {
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(t.name)}&body=${encodeURIComponent(text)}`;
      setStatus('sent');
    } else {
      setStatus('notConnected');
    }
  };

  const resetForm = () => {
    setName('');
    setReach('');
    setMessage('');
    setTouched(false);
    setStatus('idle');
  };

  const info = [
    { icon: Phone, value: t.footer.contact.phone },
    { icon: Mail, value: t.footer.contact.email },
    { icon: MapPin, value: t.footer.contact.location },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-card py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionHeading id="contact-title" align="start" eyebrow={c.eyebrow} title={c.title} description={c.description} />
          <ul className="mt-10 space-y-4">
            {info.map(({ icon: Icon, value }) => (
              <li key={value} className="flex items-center gap-4 rounded-2xl bg-page p-4 ring-1 ring-ink/5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="text-ink/70">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="rounded-3xl bg-page p-6 ring-1 ring-ink/5 sm:p-8">
          {status === 'idle' ? (
            <form onSubmit={submit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-bold text-ink">
                    {c.name}
                  </label>
                  <input
                    id={`${id}-name`}
                    className={`${fieldCls} h-12 ${nameErr ? 'ring-2 ring-red-500/70' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={c.namePh}
                    autoComplete="name"
                    aria-invalid={nameErr}
                    aria-describedby={nameErr ? `${id}-name-err` : undefined}
                  />
                  {nameErr && (
                    <p id={`${id}-name-err`} className="mt-1.5 text-sm font-bold text-red-500">
                      {c.errName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${id}-reach`} className="mb-2 block text-sm font-bold text-ink">
                    {c.reach} <span className="font-normal text-ink/45">{c.optional}</span>
                  </label>
                  <input
                    id={`${id}-reach`}
                    className={`${fieldCls} h-12`}
                    value={reach}
                    onChange={(e) => setReach(e.target.value)}
                    placeholder={c.reachPh}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`${id}-msg`} className="mb-2 block text-sm font-bold text-ink">
                  {c.message}
                </label>
                <textarea
                  id={`${id}-msg`}
                  rows={5}
                  className={`${fieldCls} resize-y py-3 ${msgErr ? 'ring-2 ring-red-500/70' : ''}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={c.messagePh}
                  aria-invalid={msgErr}
                  aria-describedby={msgErr ? `${id}-msg-err` : undefined}
                />
                {msgErr && (
                  <p id={`${id}-msg-err`} className="mt-1.5 text-sm font-bold text-red-500">
                    {c.errMessage}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient font-heading text-base font-bold text-white shadow-glow transition hover:-translate-y-0.5 sm:w-auto sm:px-8"
              >
                {c.submit}
                <Send size={18} className="rtl:-scale-x-100" aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div role="status" className="flex flex-col items-center py-10 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                <CheckCircle2 size={34} aria-hidden="true" />
              </span>
              <p className="mt-5 max-w-sm text-lg font-bold leading-relaxed text-ink">
                {status === 'sent' ? c.sent : c.notConnected}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-6 rounded-xl px-5 py-2.5 text-sm font-bold text-cyan ring-1 ring-cyan/30 transition hover:bg-cyan/10"
              >
                {c.another}
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
