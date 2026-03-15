import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-primary text-sm mb-2">{"// about"}</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            About <span className="text-gradient">Me</span>
          </h2>

          <div className="bg-card border-glow rounded-lg p-6 md:p-8 glow-box">
            <p className="text-secondary-foreground leading-relaxed mb-4">
              I'm an aspiring Software Engineer and Data Scientist at the beginning of my journey. 
              I'm driven by curiosity and a passion for problem-solving through code.
            </p>
            <p className="text-secondary-foreground leading-relaxed mb-4">
              Currently building my skills across multiple programming languages and frameworks, 
              I'm eager to contribute to real-world projects and grow as a developer.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              I believe in writing clean, efficient code and continuously learning new technologies 
              to stay at the cutting edge of software development and data science.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
