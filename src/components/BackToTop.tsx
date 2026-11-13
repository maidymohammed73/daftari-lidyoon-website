import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { usePrefs } from '../context/Preferences';

export default function BackToTop() {
  const { t } = usePrefs();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={t.backToTop}
      title={t.backToTop}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-6 end-6 z-40 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-all duration-300 hover:-translate-y-1 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp size={22} />
    </button>
  );
}
