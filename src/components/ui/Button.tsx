import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'light';
type Size = 'md' | 'lg';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  /** Trailing icon. Arrow icons should point "forward" (left in RTL, right in LTR) — see <Forward />. */
  icon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-gradient text-white shadow-glow hover:shadow-[0_22px_48px_-14px_rgba(0,174,239,0.7)]',
  secondary: 'bg-card text-ink ring-1 ring-ink/10 shadow-soft hover:ring-cyan/50',
  // Always white/navy — used on top of the brand gradient in both themes.
  light: 'bg-white text-navy shadow-card hover:bg-paper',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

/** Link styled as a button — every CTA on the site navigates (in-page or to the store). */
export default function ButtonLink({
  variant = 'primary',
  size = 'lg',
  icon,
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl font-heading font-bold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
      {icon && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
        >
          {icon}
        </span>
      )}
    </a>
  );
}
