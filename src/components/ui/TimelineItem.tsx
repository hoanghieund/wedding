type TimelineItemProps = {
  date: string;
  code: string;
  title: string;
  desc: string;
  className?: string;
};

export default function TimelineItem({ date, code, title, desc, className = "" }: TimelineItemProps) {
  return (
    <li className={`relative pb-12 pl-8 last:pb-0 sm:pl-10 ${className}`}>
      <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.9)]" />
      <p className="font-mono text-sm text-[#00e5ff]">
        {date} <span className="text-[#a0a0b0]">{"//"} {code}</span>
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{title}</h3>
      <p className="mt-2 text-base leading-7 text-[#a0a0b0]">{desc}</p>
    </li>
  );
}
