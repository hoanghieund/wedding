type TimelineItemProps = {
  date: string;
  code: string;
  title: string;
  desc: string;
  className?: string;
  highlight?: boolean;
};

export default function TimelineItem({
  date,
  code,
  title,
  desc,
  className = "",
  highlight = false,
}: TimelineItemProps) {
  return (
    <li className={`relative pb-12 pl-10 last:pb-0 sm:pl-14 ${className}`}>
      <span
        className={`absolute left-0 top-4 h-4 w-4 rounded-full border border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_18px_rgba(212,165,116,0.35)] ${
          highlight ? "animate-champagne-pulse" : ""
        }`}
      />
      <div className={`section-shell rounded-[1.75rem] p-6 sm:p-8 ${highlight ? "border-[rgba(244,228,193,0.22)]" : ""}`}>
        <p className="section-label text-[10px]">
          {date} <span className="text-[var(--text-secondary)]">// {code}</span>
        </p>
        <h3 className="mt-3 text-2xl font-display-serif text-[var(--accent)] sm:text-3xl">{title}</h3>
        <p className="copy-muted mt-4 text-lg leading-8 sm:text-xl">{desc}</p>
      </div>
    </li>
  );
}
