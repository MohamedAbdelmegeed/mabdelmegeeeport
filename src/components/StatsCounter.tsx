import { useEffect, useRef, useState } from "react";

interface Stat { value: number; label: string; suffix?: string; }

const stats: Stat[] = [
  { value: 3, label: "Years Coding", suffix: "+" },
  { value: 10, label: "Tech Stack", suffix: "+" },
  { value: 3.26, label: "GPA", suffix: "" },
  { value: 5, label: "Projects Built", suffix: "+" },
];

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isFloat = !Number.isInteger(value);
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = isFloat ? (eased * value).toFixed(2) : Math.round(eased * value);
          setCount(Number(cur));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-glow font-heading text-3xl md:text-4xl font-bold text-primary">
      {Number.isInteger(value) ? count : count.toFixed(2)}{suffix}
    </span>
  );
};

const StatsCounter = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
    {stats.map((s) => (
      <div key={s.label} className="flex flex-col items-center gap-1 glass rounded-xl py-5 px-4">
        <Counter value={s.value} suffix={s.suffix} />
        <span className="font-heading text-xs text-muted-foreground tracking-widest uppercase">{s.label}</span>
      </div>
    ))}
  </div>
);

export default StatsCounter;
