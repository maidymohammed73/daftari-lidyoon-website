import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Content, type Lang } from '../data/content';

export type Theme = 'light' | 'dark';

interface Preferences {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: Content;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const PreferencesContext = createContext<Preferences | null>(null);

const LANG_KEY = 'dl-lang';
const THEME_KEY = 'dl-theme';

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode etc.) — preference just won't persist */
  }
}

/**
 * Language (Arabic/English) and theme (light/dark).
 * The inline script in index.html applies the saved values before first paint;
 * here we read them back from <html> so React starts in sync.
 */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const root = document.documentElement;
  const [lang, setLang] = useState<Lang>(root.lang === 'en' ? 'en' : 'ar');
  const [theme, setTheme] = useState<Theme>(root.classList.contains('dark') ? 'dark' : 'light');

  const t = translations[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // (Page title / description are set in App, which knows the current route.)
  useEffect(() => {
    root.lang = lang;
    root.dir = dir;
  }, [lang, dir, root]);

  useEffect(() => {
    root.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07182D' : '#F5F9FF');
  }, [theme, root]);

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next = l === 'ar' ? 'en' : 'ar';
      save(LANG_KEY, next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((th) => {
      const next = th === 'dark' ? 'light' : 'dark';
      save(THEME_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, dir, t, toggleLang, theme, toggleTheme }) as Preferences,
    [lang, dir, t, toggleLang, theme, toggleTheme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePrefs must be used inside <PreferencesProvider>');
  return ctx;
}
