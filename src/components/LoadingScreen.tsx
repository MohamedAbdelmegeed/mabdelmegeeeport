import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Dragon fire ambient glow */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(160 60% 45% / 0.15), hsl(280 60% 55% / 0.05), transparent 70%)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="flex flex-col items-center gap-8 relative">
          {/* Dragon eye / logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative"
          >
            {/* Outer dragon ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full"
              style={{ border: "1px solid hsl(160 60% 45% / 0.2)" }}
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
            />
            <motion.div
              className="absolute inset-[-35px] rounded-full"
              style={{ border: "1px dashed hsl(280 60% 55% / 0.15)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="w-28 h-28 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, hsl(160 60% 45% / 0.1), hsl(280 60% 55% / 0.05))",
                border: "1px solid hsl(160 60% 45% / 0.3)",
                boxShadow: "0 0 60px hsl(160 60% 45% / 0.2), inset 0 0 30px hsl(160 60% 45% / 0.05)"
              }}
              animate={{
                boxShadow: [
                  "0 0 60px hsl(160 60% 45% / 0.2), inset 0 0 30px hsl(160 60% 45% / 0.05)",
                  "0 0 100px hsl(160 60% 45% / 0.4), inset 0 0 50px hsl(160 60% 45% / 0.1)",
                  "0 0 60px hsl(160 60% 45% / 0.2), inset 0 0 30px hsl(160 60% 45% / 0.05)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="font-heading text-3xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {"<MA/>"}
              </motion.span>
            </motion.div>

            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-2xl"
                style={{ border: "1px solid hsl(160 60% 45% / 0.15)" }}
                animate={{ scale: [1, 1.5 + i * 0.2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.p
              className="font-heading text-xs text-primary/60 tracking-[0.3em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing
            </motion.p>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-6 rounded-full"
                  style={{ background: "hsl(160 60% 45%)" }}
                  animate={{
                    scaleY: [0.3, 1, 0.3],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          onAnimationComplete={onComplete}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            background: "linear-gradient(90deg, hsl(160 60% 45%), hsl(280 60% 55%), hsl(160 60% 45%))",
            boxShadow: "0 0 20px hsl(160 60% 45% / 0.5)",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
