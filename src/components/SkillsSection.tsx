import { motion } from "framer-motion";

const skills = [
  { name: "Python", level: 85, color: "from-[hsl(160,60%,45%)] to-[hsl(180,50%,55%)]" },
  { name: "C", level: 75, color: "from-[hsl(200,60%,50%)] to-[hsl(220,50%,55%)]" },
  { name: "C++", level: 70, color: "from-[hsl(200,60%,50%)] to-[hsl(220,50%,55%)]" },
  { name: "Java", level: 75, color: "from-[hsl(30,80%,50%)] to-[hsl(15,80%,55%)]" },
  { name: "JavaScript", level: 80, color: "from-[hsl(50,90%,50%)] to-[hsl(40,80%,55%)]" },
  { name: "HTML", level: 90, color: "from-[hsl(15,80%,55%)] to-[hsl(25,80%,50%)]" },
  { name: "CSS", level: 85, color: "from-[hsl(210,80%,55%)] to-[hsl(230,70%,55%)]" },
  { name: "SQL", level: 65, color: "from-[hsl(280,60%,55%)] to-[hsl(300,50%,50%)]" },
  { name: "React", level: 50, color: "from-[hsl(190,80%,50%)] to-[hsl(200,70%,55%)]" },
  { name: "Next.js", level: 40, color: "from-[hsl(0,0%,60%)] to-[hsl(0,0%,40%)]" },
];

const tools = ["VS Code", "Visual Studio", "PyCharm", "IntelliJ", "CLion", "SSMS", "Code::Blocks"];
const languages = ["English (C1)", "German (A2)"];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        background: "radial-gradient(circle at 20% 50%, hsl(160 60% 45%), transparent 50%)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {"// skills"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-12"
        >
          Tech <span className="text-gradient">Stack</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass border-glow rounded-xl p-5 group cursor-default transition-shadow hover:glow-box"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.5 }}
                  className="font-heading text-xs text-muted-foreground"
                >
                  {skill.level}%
                </motion.span>
              </div>
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                >
                  <div className="absolute inset-0 rounded-full opacity-50" style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)"
                  }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass border-glow rounded-xl p-5"
          >
            <h3 className="font-heading text-sm font-bold text-foreground mb-4">
              <span className="text-primary">{">"}</span> Tools & IDEs
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="font-heading text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/50"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass border-glow rounded-xl p-5"
          >
            <h3 className="font-heading text-sm font-bold text-foreground mb-4">
              <span className="text-primary">{">"}</span> Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="font-heading text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/50"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
