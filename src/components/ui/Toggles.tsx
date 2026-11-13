import { ArrowLeft, Languages, Moon, Sun } from 'lucide-react';
import { usePrefs } from '../../context/Preferences';

const iconButton =
  'grid h-11 min-w-11 place-items-center rounded-xl px-2.5 text-ink ring-1 ring-ink/10 transition hover:bg-page hover:ring-cyan/40';

export function LangToggle({ className = '' }: { className?: string }) {
  const { t, lang, toggleLang } = usePrefs();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.ui.switchLang}
      title={t.ui.switchLang}
      className={`${iconButton} ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <Languages size={18} aria-hidden="true" />
        <span lang={lang === 'ar' ? 'en' : 'ar'} className="font-heading text-sm font-bold leading-none">
          {t.ui.langShort}
        </span>
      </span>
    </button>
  );
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { t, theme, toggleTheme } = usePrefs();
  const dark = theme === 'dark';
  const label = dark ? t.ui.toLight : t.ui.toDark;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={dark}
      className={`${iconButton} ${className}`}
    >
      {dark ? <Sun size={19} className="text-cyan" aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
    </button>
  );
}

/** An arrow that points "forward" for the current reading direction. */
export function Forward({ size = 20 }: { size?: number }) {
  return <ArrowLeft size={size} className="ltr:rotate-180" />;
}
