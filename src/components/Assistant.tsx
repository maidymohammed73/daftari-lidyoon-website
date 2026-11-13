import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Bot, CheckCircle2, Info, RotateCcw, SendHorizontal, Sparkles } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import { suggestions } from '../lib/assistantBrain';
import { useAssistantChat } from '../lib/useAssistantChat';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { Forward } from './ui/Toggles';

export const ASSISTANT_INPUT_ID = 'assistant-input';

export default function Assistant() {
  const { t, lang } = usePrefs();
  const a = t.assistant;
  const { messages, typing, send, reset } = useAssistantChat();
  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view — scrolls the chat box only, never the page.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || typing) return;
    send(draft);
    setDraft('');
  };

  // Suggestion chips appear under the latest message when it's a bot reply that asks for them.
  const last = messages[messages.length - 1];
  const lastSuggestId = last.from === 'bot' && last.suggest ? last.id : -1;

  return (
    <section id="assistant" aria-labelledby="assistant-title" className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading id="assistant-title" align="start" eyebrow={a.eyebrow} title={a.title} description={a.description} />
          <ul className="mt-8 space-y-4">
            {a.points.map((p, i) => (
              <Reveal as="li" key={i} delay={i * 100} className="flex items-center gap-3 text-lg font-bold text-ink/80">
                <CheckCircle2 size={22} className="shrink-0 text-cyan" aria-hidden="true" />
                {p}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Live chat */}
        <Reveal className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-brand-gradient opacity-10 blur-2xl" aria-hidden="true" />
          <div className="relative flex h-[34rem] flex-col overflow-hidden rounded-[2rem] bg-page shadow-card ring-1 ring-ink/10">
            {/* header */}
            <div className="flex items-center gap-3 bg-brand-gradient px-5 py-4 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <Bot size={24} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-heading font-bold">{a.botName}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                  {a.online}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="grid h-9 w-9 place-items-center rounded-xl text-white/80 transition hover:bg-white/15 hover:text-white"
                aria-label={a.reset}
                title={a.reset}
              >
                <RotateCcw size={17} />
              </button>
              <Sparkles size={20} className="text-white/70" aria-hidden="true" />
            </div>

            {/* messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 sm:p-5" role="log" aria-live="polite" aria-label={a.botName}>
              {messages.map((m) => {
                const isUser = m.from === 'user';
                const text = m.greeting ? a.greeting : m.text;
                return (
                  <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <p
                      dir="auto"
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                        isUser
                          ? 'rounded-se-md bg-brand-gradient text-white shadow-glow'
                          : 'rounded-ss-md bg-card text-ink shadow-soft ring-1 ring-ink/5'
                      }`}
                    >
                      {text}
                    </p>
                    {m.link && (
                      <a
                        href={m.link.href}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-cyan/10 px-3 py-1.5 text-sm font-bold text-cyan ring-1 ring-cyan/20 transition hover:bg-cyan/15"
                      >
                        {m.link.label}
                        <Forward size={14} />
                      </a>
                    )}
                    {m.id === lastSuggestId && !typing && (
                      <div className="mt-3 w-full">
                        <p className="mb-2 text-xs font-bold text-ink/50">{a.tryAsking}</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions[lang].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => send(s)}
                              className="rounded-full bg-card px-3.5 py-2 text-sm font-bold text-ink/80 ring-1 ring-ink/10 transition hover:text-cyan hover:ring-cyan/40"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {typing && (
                <div className="flex justify-start" role="status" aria-label={a.typing}>
                  <span className="flex gap-1 rounded-2xl rounded-ss-md bg-card px-4 py-3 ring-1 ring-ink/5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-cyan motion-reduce:animate-none"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* input */}
            <form onSubmit={submit} className="flex items-center gap-2 border-t border-ink/5 bg-card px-3 py-3 sm:px-4">
              <label htmlFor={ASSISTANT_INPUT_ID} className="sr-only">
                {a.inputLabel}
              </label>
              <input
                id={ASSISTANT_INPUT_ID}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={a.inputPlaceholder}
                maxLength={300}
                autoComplete="off"
                dir="auto"
                className="h-11 flex-1 rounded-xl bg-page px-4 text-[15px] text-ink ring-1 ring-ink/10 placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-cyan"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label={a.send}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition enabled:hover:-translate-y-0.5 disabled:opacity-40 disabled:shadow-none"
              >
                <SendHorizontal size={18} className="rtl:rotate-180" />
              </button>
            </form>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-ink/50">
            <Info size={13} className="shrink-0 text-cyan" aria-hidden="true" />
            {a.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
