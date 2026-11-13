import type { ReactNode } from 'react';
import { BatteryFull, Signal, Wifi } from 'lucide-react';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  /** Accessible description of what the mockup illustrates. */
  label: string;
}

/** A realistic smartphone shell that hosts an illustrative app screen. */
export default function PhoneFrame({ children, className = '', label }: PhoneFrameProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-[270px] shrink-0 rounded-[2.75rem] bg-navy p-[9px] shadow-phone dark:ring-1 dark:ring-white/15 ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-navy" aria-hidden="true" />
      <span className="absolute -right-[3px] top-24 h-8 w-[3px] rounded-r bg-navy" aria-hidden="true" />
      <span className="absolute -right-[3px] top-36 h-14 w-[3px] rounded-r bg-navy" aria-hidden="true" />

      <div className="relative h-[560px] overflow-hidden rounded-[2.2rem] bg-paper" aria-hidden="true">
        {/* status bar + dynamic island */}
        <div className="relative z-20 flex h-9 items-center justify-between px-6 pt-1 text-[10px] font-bold text-navy" dir="ltr">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-navy" />
          <span className="flex items-center gap-1">
            <Signal size={11} strokeWidth={2.5} />
            <Wifi size={11} strokeWidth={2.5} />
            <BatteryFull size={14} strokeWidth={2} />
          </span>
        </div>
        <div className="h-[calc(100%-2.25rem)] overflow-hidden">{children}</div>
        {/* home indicator */}
        <span className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-navy/80" />
      </div>
    </figure>
  );
}
