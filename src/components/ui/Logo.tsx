import { usePrefs } from '../../context/Preferences';

interface LogoProps {
  className?: string;
  /** Eager-load the logo when it is above the fold. */
  priority?: boolean;
}

/**
 * The official logo, rendered exactly as supplied (no recoloring or redrawing).
 * It has a white background, so callers always place it on a white surface —
 * in both light and dark mode.
 */
export default function Logo({ className = 'h-14', priority = false }: LogoProps) {
  const { t } = usePrefs();
  return (
    <img
      src="/logo.jpg"
      alt={t.ui.logoAlt}
      width={1536}
      height={1024}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
