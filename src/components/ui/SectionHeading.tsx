import type { Rich } from '../../data/content';
import Reveal from './Reveal';

/** Renders a title whose middle part gets the brand gradient. */
export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.pre}
      <span className="text-gradient">{value.hl}</span>
      {value.post}
    </>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: Rich | string;
  description?: string;
  id?: string;
  align?: 'center' | 'start';
  /** `light` = white text, for sections on a navy background. */
  tone?: 'default' | 'light';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'center',
  tone = 'default',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const light = tone === 'light';
  return (
    <Reveal className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
          light ? 'bg-white/10 text-cyan ring-1 ring-white/15' : 'bg-cyan/10 text-cyan'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        id={id}
        className={`mt-4 text-3xl font-extrabold leading-[1.35] sm:text-4xl lg:text-[2.6rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {typeof title === 'string' ? title : <RichText value={title} />}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/75' : 'text-ink/70'}`}>{description}</p>
      )}
    </Reveal>
  );
}
