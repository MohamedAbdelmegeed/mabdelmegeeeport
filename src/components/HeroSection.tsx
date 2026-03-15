import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(160 60% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 60% 45%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-3xl w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-primary text-sm md:text-base mb-4"
        >
          {">"} hello_world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          I'm <span className="text-gradient">Your Name</span>
          <span className="text-primary animate-blink">_</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-8"
        >
          Software Engineer & Data Scientist. Passionate about building elegant solutions and extracting insights from data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <a
            href="#contact"
            className="font-heading text-sm px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity glow-box"
          >
            Get in touch
          </a>
          <a
            href="#about"
            className="font-heading text-sm px-6 py-3 border-glow rounded-md text-foreground hover:bg-secondary transition-colors"
          >
            Learn more
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
