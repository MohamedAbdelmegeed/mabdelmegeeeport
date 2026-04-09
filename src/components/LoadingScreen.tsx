import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(onComplete, 250);
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4 }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Energy orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(160 60% 45% / 0.1), transparent 70%)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(280 60% 55% / 0.06), transparent 70%)" }}
          animate={{ scale: [1.2, 0.8, 1.2], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="flex flex-col items-center gap-8 relative z-10 px-6">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-[-22px] rounded-full"
              style={{ border: "1px solid hsl(160 60% 45% / 0.2)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[-38px] rounded-full"
              style={{ border: "1px dashed hsl(280 60% 55% / 0.1)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(160 60% 45% / 0.1), hsl(280 60% 55% / 0.05))",
                border: "1px solid hsl(160 60% 45% / 0.3)",
              }}
              animate={{
                boxShadow: [
                  "0 0 40px hsl(160 60% 45% / 0.15), inset 0 0 20px hsl(160 60% 45% / 0.05)",
                  "0 0 100px hsl(160 60% 45% / 0.4), inset 0 0 40px hsl(160 60% 45% / 0.1)",
                  "0 0 40px hsl(160 60% 45% / 0.15), inset 0 0 20px hsl(160 60% 45% / 0.05)",
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
                style={{ border: "1px solid hsl(160 60% 45% / 0.1)" }}
                animate={{ scale: [1, 1.5 + i * 0.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>

          {/* Simple status text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.p
              className="font-heading text-xs text-primary/60 tracking-[0.3em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing
            </motion.p>

            {/* Equalizer bars */}
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-5 rounded-full bg-primary"
                  animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 md:w-56 space-y-1.5">
            <div className="h-[2px] rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(160 60% 45%), hsl(280 60% 55%))",
                  boxShadow: "0 0 10px hsl(160 60% 45% / 0.5)",
                  width: `${progress}%`,
                }}
              />
            </div>
            <p className="font-heading text-[10px] text-muted-foreground text-center">{progress}%</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
