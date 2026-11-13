import { Play, Smartphone, type LucideIcon } from 'lucide-react';
import { siteConfig } from '../../data/content';
import { usePrefs } from '../../context/Preferences';

/**
 * Generic store buttons (not the official Google/Apple badge artwork).
 * With no URL configured they render as non-interactive "coming soon" badges.
 */
export default function StoreBadges({ className = '' }: { className?: string }) {
  const { t } = usePrefs();
  const s = t.stores;
  const stores: { name: string; url: string; icon: LucideIcon }[] = [
    { name: s.googlePlay, url: siteConfig.googlePlayUrl, icon: Play },
    { name: s.appStore, url: siteConfig.appStoreUrl, icon: Smartphone },
  ];

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {stores.map(({ name, url, icon: Icon }) => {
        const inner = (
          <>
            <Icon size={24} aria-hidden="true" className={Icon === Play ? 'fill-current' : ''} />
            <span className="flex flex-col text-start leading-tight">
              <span className="text-[11px] text-white/70">{url ? s.getOn : s.comingSoon}</span>
              <span lang="en" className="font-heading text-base font-bold">
                {name}
              </span>
            </span>
          </>
        );
        const cls =
          'flex h-14 min-w-[10.5rem] items-center gap-3 rounded-2xl bg-white/10 px-4 text-white ring-1 ring-white/25 backdrop-blur-sm';
        return (
          <li key={name}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:bg-white/20`}>
                {inner}
              </a>
            ) : (
              <div className={`${cls} cursor-default`} aria-label={`${s.comingSoon} ${name}`}>
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
