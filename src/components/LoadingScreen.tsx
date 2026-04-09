import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(onComplete, 300);
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  const codeLines = [
    "const developer = new DragonDev();",
    "developer.init({ mode: 'legendary' });",
    "await developer.loadSkills('fullstack');",
    "developer.breatheFire(); // 🔥",
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Dragon energy orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(160 60% 45% / 0.12), transparent 70%)" }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(280 60% 55% / 0.08), transparent 70%)" }}
          animate={{ scale: [1.2, 0.8, 1.2], x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="flex flex-col items-center gap-8 relative z-10 px-6">
          {/* Dragon eye logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-[-24px] rounded-full"
              style={{ border: "1px solid hsl(160 60% 45% / 0.2)" }}
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
            />
            <motion.div
              className="absolute inset-[-40px] rounded-full"
              style={{ border: "1px dashed hsl(280 60% 55% / 0.12)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, hsl(160 60% 45% / 0.1), hsl(280 60% 55% / 0.05))",
                border: "1px solid hsl(160 60% 45% / 0.3)",
                boxShadow: "0 0 60px hsl(160 60% 45% / 0.2), inset 0 0 30px hsl(160 60% 45% / 0.05)",
              }}
              animate={{
                boxShadow: [
                  "0 0 60px hsl(160 60% 45% / 0.2), inset 0 0 30px hsl(160 60% 45% / 0.05)",
                  "0 0 120px hsl(160 60% 45% / 0.5), inset 0 0 50px hsl(160 60% 45% / 0.15)",
                  "0 0 60px hsl(160 60% 45% / 0.2), inset 0 0 30px hsl(160 60% 45% / 0.05)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="font-heading text-2xl md:text-3xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {"<MA/>"}
              </motion.span>
            </motion.div>

            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-2xl"
                style={{ border: "1px solid hsl(160 60% 45% / 0.12)" }}
                animate={{ scale: [1, 1.6 + i * 0.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>

          {/* Code-style text animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-xs md:max-w-sm font-heading text-[10px] md:text-xs space-y-1"
          >
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.4 }}
                className="flex gap-2"
              >
                <span className="text-muted-foreground/40 select-none w-4 text-right">{i + 1}</span>
                <motion.span
                  className="text-primary/70"
                  animate={i <= Math.floor(progress / 25) ? { opacity: 1 } : { opacity: 0.3 }}
                >
                  {line}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-xs md:max-w-sm space-y-2"
          >
            <div className="flex justify-between font-heading text-[10px] text-muted-foreground">
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
                Initializing dragon mode...
              </motion.span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(160 60% 45%), hsl(200 60% 55%), hsl(280 60% 55%))",
                  boxShadow: "0 0 12px hsl(160 60% 45% / 0.5)",
                  width: `${progress}%`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
