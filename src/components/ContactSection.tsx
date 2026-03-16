import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const contactLinks = [
  { icon: Mail, label: "Email", value: "m.Abdelmegeed291@gmail.com", href: "mailto:m.Abdelmegeed291@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "Mohamed Abdelmegeed", href: "https://www.linkedin.com/in/mohamed-abdelmegeed-" },
  { icon: Github, label: "GitHub", value: "MohamedAbdelmegeed", href: "https://github.com/MohamedAbdelmegeed" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-28 px-6 relative">
      <FloatingParticles count={8} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-primary text-sm mb-2 tracking-wider"
        >
          {"// contact"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-4"
        >
          Let's <span className="text-gradient">Connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-lg text-base md:text-lg"
        >
          I'm always open to new opportunities, collaborations, and interesting conversations.
        </motion.p>

        <div className="space-y-4">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ x: 8, boxShadow: "0 0 40px hsl(160 60% 45% / 0.1)" }}
              className="flex items-center gap-4 glass border-glow rounded-xl p-5 group transition-all cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <link.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold text-foreground">{link.label}</p>
                <p className="text-muted-foreground text-sm truncate">{link.value}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
