import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const events = [
  
  { date: "Sep 2025", title: "G-Force Student Activities Forum (2nd Edition)", org: "Galala National University" },
  { date: "Sep 2025", title: "Training on Protocol, Etiquette & Workplace Formalities", org: "Leadership Candidates Program" },
  { date: "Oct 2025", title: "Future Leaders Forum", org: "Leadership Development Institute (LDI), Ministry of Higher Education" },
  { date: "Nov 2025", title: "S.H.I.N.E Initiative", org: "Cairo University" },
  { date: "Nov 2025", title: "AI, Science & Innovation Celebration", org: "Helwan University (Sponsored by Roseatom)" },
];

const ProfessionalDevelopmentSection = () => {
  return (
    <section id="development" className="py-28 px-6 relative">
      <FloatingParticles count={5} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {"// growth"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-12"
        >
          Professional <span className="text-gradient">Development</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
                className="relative pl-16 md:pl-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", bounce: 0.5 }}
                  className="absolute left-2 md:left-4 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-primary" />
                </motion.div>

                <motion.div
                  className="absolute left-2 md:left-4 w-8 h-8 rounded-full border border-primary/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />

                <motion.div
                  whileHover={{ x: 6, boxShadow: "0 0 40px hsl(160 60% 45% / 0.1)" }}
                  className="glass border-glow rounded-xl p-5 transition-all cursor-default"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading text-sm font-bold text-foreground">{event.title}</h3>
                    <span className="font-heading text-xs text-primary/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{event.org}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activities & Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-6">
            Activities & <span className="text-gradient">Leadership</span>
          </h3>
          <div className="space-y-3">
            {[
              "Leadership Volunteer Support Member – Leadership Development Institute (LDI), Ministry of Higher Education",
              "Faculty Leader for Level 2 – Computer Science – HNU",
              "Vice Head, Art Committee – Faculty Student Union",
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="glass border-glow rounded-xl p-4 flex items-center gap-3 cursor-default"
              >
                <Star className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-foreground">{activity}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalDevelopmentSection;
