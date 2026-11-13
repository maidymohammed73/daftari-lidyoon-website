import { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';
import { usePrefs } from '../context/Preferences';
import { ASSISTANT_INPUT_ID } from './Assistant';

/** Floating "Ask the assistant" button — jumps to the chat and focuses the input. Hidden while the chat is on screen. */
export default function AskFab() {
  const { t } = usePrefs();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const section = document.getElementById('assistant');
    const onScroll = () => {
      const past = window.scrollY > 500;
      const r = section?.getBoundingClientRect();
      const chatVisible = !!r && r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.25;
      setHidden(!past || chatVisible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open = () => {
    document.getElementById('assistant')?.scrollIntoView({ block: 'center' });
    setTimeout(() => document.getElementById(ASSISTANT_INPUT_ID)?.focus({ preventScroll: true }), 500);
  };

  return (
    <button
      type="button"
      onClick={open}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className={`fixed bottom-6 start-6 z-40 flex h-12 items-center gap-2 rounded-2xl bg-navy px-4 font-heading text-sm font-bold text-white shadow-card ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 ${
        hidden ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
      }`}
    >
      <span className="relative">
        <Bot size={20} className="text-cyan" aria-hidden="true" />
        <span className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-navy" aria-hidden="true" />
      </span>
      {t.assistant.floating}
    </button>
  );
}
