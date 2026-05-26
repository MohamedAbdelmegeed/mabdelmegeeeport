import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full"
        style={{
          background: "linear-gradient(90deg, hsl(160 60% 45%), hsl(280 60% 55%))",
          boxShadow: "0 0 8px hsl(160 60% 45% / 0.6)",
          width: "0%",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
