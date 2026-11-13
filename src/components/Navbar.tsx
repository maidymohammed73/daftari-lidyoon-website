import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { headerIds, sectionIds, siteConfig } from '../data/content';
import { usePrefs } from '../context/Preferences';
import Logo from './ui/Logo';
import ButtonLink from './ui/Button';
import { LangToggle, ThemeToggle } from './ui/Toggles';

export default function Navbar({ base = '' }: { base?: string }) {
  const { t } = usePrefs();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(base ? '' : 'home');
  const appHref = siteConfig.appUrl.startsWith('#') ? `${base}${siteConfig.appUrl}` : siteConfig.appUrl;

  // Elevate the bar once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => s !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-card/95 shadow-soft backdrop-blur-md' : 'bg-card/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-x flex h-[4.5rem] items-center justify-between gap-3" aria-label={t.ui.mainNav}>
        {/* Logo always sits on white (it has a white background). */}
        <a href={`${base}#home`} className="shrink-0 rounded-xl bg-white px-1.5" aria-label={t.ui.homeAria}>
          <Logo className="h-14" priority />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {headerIds.map((id) => (
            <li key={id}>
              <a
                href={`${base}#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-xl px-3 py-2 text-[15px] font-bold transition-colors ${
                  active === id ? 'text-cyan' : 'text-ink/75 hover:text-ink'
                }`}
              >
                {t.nav[id]}
                {active === id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cyan" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <ButtonLink href={appHref} size="md" className="hidden sm:inline-flex">
            {t.ui.start}
          </ButtonLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl text-ink ring-1 ring-ink/10 transition hover:bg-page xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" className="border-t border-ink/5 bg-card xl:hidden" hidden={!open}>
        <ul className="container-x flex flex-col gap-1 py-4">
          {headerIds.map((id) => (
            <li key={id}>
              <a
                href={`${base}#${id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  active === id ? 'bg-cyan/10 text-cyan' : 'text-ink hover:bg-page'
                }`}
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
          <li className="pt-2 sm:hidden">
            <ButtonLink href={appHref} className="w-full" onClick={() => setOpen(false)}>
              {t.ui.start}
            </ButtonLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
