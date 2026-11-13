import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter, type LucideIcon } from 'lucide-react';
import { sectionIds, siteConfig, type SocialKey } from '../data/content';
import { usePrefs } from '../context/Preferences';
import Logo from './ui/Logo';
import StoreBadges from './ui/StoreBadges';

const socialIcons: Record<SocialKey, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageCircle,
  x: Twitter,
};

export default function Footer({ base = '' }: { base?: string }) {
  const { t } = usePrefs();
  const f = t.footer;
  const year = new Date().getFullYear();
  const contact = [
    { icon: Phone, value: f.contact.phone },
    { icon: Mail, value: f.contact.email },
    { icon: MapPin, value: f.contact.location },
  ];

  return (
    <footer className="bg-navy text-white dark:border-t dark:border-white/10">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Logo has a white background, so it sits on a white card */}
          <a href={`${base}#home`} className="inline-block rounded-2xl bg-white p-2 shadow-card" aria-label={f.backToTop}>
            <Logo className="h-20" />
          </a>
          <p className="mt-6 max-w-sm leading-relaxed text-white/70">{f.description}</p>
          <ul className="mt-6 flex gap-3" aria-label={f.socialLabel}>
            {siteConfig.social.map(({ key, href }) => {
              const Icon = socialIcons[key];
              const label = `${f.social[key]} — ${f.linkSoon}`;
              return (
                <li key={key}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white/80 transition hover:bg-cyan hover:text-white"
                  >
                    <Icon size={19} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
          <StoreBadges className="mt-6" />
        </div>

        <nav aria-label={f.quickLinks}>
          <h2 className="font-heading text-lg font-bold">{f.quickLinks}</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`${base}#${id}`} className="text-white/70 transition hover:text-cyan">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-lg font-bold">{f.contactTitle}</h2>
          <ul className="mt-5 space-y-4">
            {contact.map(({ icon: Icon, value }) => (
              <li key={value} className="flex items-center gap-3 text-white/70">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan">
                  <Icon size={18} aria-hidden="true" />
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/55 md:flex-row">
          <p>
            © {year} {t.name}. {f.rights}
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <a href="/privacy" className="transition hover:text-cyan">
                {t.legal.privacyLink}
              </a>
            </li>
            <li>
              <a href="/terms" className="transition hover:text-cyan">
                {t.legal.termsLink}
              </a>
            </li>
          </ul>
          <p className="font-heading font-bold text-white/70">{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
