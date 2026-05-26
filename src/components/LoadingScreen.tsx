import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Stay for 650ms then fade out
    const t1 = setTimeout(() => setPhase("exit"), 650);
    const t2 = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo box */}
      <div
        style={{
          opacity: phase === "enter" ? 1 : 0,
          transform: phase === "exit" ? "scale(0.85)" : "scale(1)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
          style={{
            background: "linear-gradient(135deg, hsl(160 60% 45% / 0.12), hsl(280 60% 55% / 0.06))",
            border: "1px solid hsl(160 60% 45% / 0.35)",
            boxShadow: "0 0 60px hsl(160 60% 45% / 0.25), inset 0 0 30px hsl(160 60% 45% / 0.06)",
            animation: "loaderPulse 1.2s ease-in-out infinite",
          }}
        >
          <span
            className="font-heading text-xl font-bold text-primary"
            style={{ letterSpacing: "-0.02em" }}
          >
            {"<MA/>"}
          </span>
        </div>

        {/* Bar */}
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ width: "6rem", background: "hsl(220 15% 16%)" }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, hsl(160 60% 45%), hsl(280 60% 55%))",
              boxShadow: "0 0 8px hsl(160 60% 45% / 0.6)",
              animation: "loaderBar 0.65s ease-out forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
