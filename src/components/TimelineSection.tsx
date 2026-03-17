import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const timelineItems = [
  {
    type: "education",
    icon: GraduationCap,
    title: "B.Sc. Computer Science & AI",
    org: "Helwan National University",
    date: "Sep 2024 – Present",
    details: "Level 2 · GPA: 3.26 · Cairo, Egypt",
  },
  {
    type: "training",
    icon: Award,
    title: "Data Science Trainee",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    date: "Dec 2025 – Present",
    details: "Intensive data science program by the Egyptian government",
  },
  {
    type: "experience",
    icon: Briefcase,
    title: "Customer Service Representative",
    org: "Concentrix (Verizon Account)",
    date: "Jun 2025 – Oct 2025",
    details: "Handled customer inquiries and support for Verizon services",
  },
  {
    type: "experience",
    icon: Briefcase,
    title: "Senior Mentor",
    org: "Royal Tot's Camp",
    date: "2023 – 2024",
    details: "Led mentoring programs and guided younger participants",
  },
];

 const activities = [
  "Leadership Volunteer Support Member – Leadership Development Institute (LDI), Ministry of Higher Education",
  "Faculty Leader for Level 2 – Computer Science – HNU",
  "Vice Head, Art Committee – Faculty Student Union"
  
];



const TimelineSection = () => {
  return (
    <section id="timeline" className="py-28 px-6 relative">
      <FloatingParticles count={6} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {"// journey"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-12"
        >
          Education & <span className="text-gradient">Experience</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.title + item.org}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 100 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Icon dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", bounce: 0.5 }}
                  className="absolute left-2 md:left-4 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                </motion.div>

                {/* Pulse ring */}
                <motion.div
                  className="absolute left-2 md:left-4 w-8 h-8 rounded-full border border-primary/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />

                <motion.div
                  whileHover={{ x: 6, boxShadow: "0 0 40px hsl(160 60% 45% / 0.1)" }}
                  className="glass border-glow rounded-xl p-5 transition-all cursor-default"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading text-sm font-bold text-foreground">{item.title}</h3>
                    <span className="font-heading text-xs text-primary/80">{item.date}</span>
                  </div>
                  <p className="font-heading text-xs text-muted-foreground mb-1">{item.org}</p>
                  <p className="text-muted-foreground text-sm">{item.details}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
