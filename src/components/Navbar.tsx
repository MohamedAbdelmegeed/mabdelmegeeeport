import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50"
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="font-heading text-sm font-bold text-primary"
        >
          {"<MA />"}
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -2 }}
              className="font-heading text-xs text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-b border-border/50 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="block font-heading text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-primary/5"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
