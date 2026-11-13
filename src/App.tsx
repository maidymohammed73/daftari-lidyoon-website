import { useEffect } from 'react';
import { usePrefs } from './context/Preferences';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Showcase from './components/Showcase';
import Assistant from './components/Assistant';
import Compare from './components/Compare';
import Calculator from './components/Calculator';
import Benefits from './components/Benefits';
import Security from './components/Security';
import Faq from './components/Faq';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AskFab from './components/AskFab';
import LegalPage, { type LegalKind } from './components/LegalPage';

/** Tiny path-based router: "/" is the landing page, "/privacy" and "/terms" are legal pages. */
function currentPage(): 'home' | LegalKind {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  return 'home';
}

export default function App() {
  const { t } = usePrefs();
  const page = currentPage();
  const isHome = page === 'home';
  /** Prefix for in-page anchors so they also work from the legal pages. */
  const base = isHome ? '' : '/';

  // Page title + meta description follow the current page and language.
  useEffect(() => {
    document.title = isHome ? t.meta.title : `${t.legal[page as LegalKind].title} | ${t.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', isHome ? t.meta.description : t.legal[page as LegalKind].intro);
  }, [t, page, isHome]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        {t.ui.skip}
      </a>
      <Navbar base={base} />
      <main id="main">
        {isHome ? (
          <>
            <Hero />
            <Stats />
            <About />
            <Features />
            <HowItWorks />
            <Showcase />
            <Assistant />
            <Compare />
            <Calculator />
            <Benefits />
            <Security />
            <Faq />
            <Contact />
            <FinalCTA />
          </>
        ) : (
          <LegalPage kind={page} />
        )}
      </main>
      <Footer base={base} />
      {isHome && <AskFab />}
      <BackToTop />
    </>
  );
}
