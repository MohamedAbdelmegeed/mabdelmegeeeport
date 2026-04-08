import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.journey, href: "#timeline" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.development, href: "#development" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 glass-ultra border-b border-primary/10"
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="font-heading text-sm font-bold text-primary flex items-center gap-1.5 relative"
        >
          <Flame className="w-4 h-4" />
          {"<MA />"}
          <motion.div
            className="absolute -inset-2 rounded-lg bg-primary/5"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.a>

        <div className="hidden md:flex items-center gap-0.5 relative">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
              onHoverStart={() => setActiveHover(i)}
              onHoverEnd={() => setActiveHover(null)}
              className="font-heading text-xs text-muted-foreground hover:text-primary transition-colors px-3.5 py-2 rounded-lg relative"
            >
              {activeHover === i && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-lg bg-primary/8 border border-primary/10"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}
          <div className="w-px h-4 bg-border/50 mx-1" />
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <motion.button
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            className="text-foreground p-2"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-ultra border-b border-primary/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ x: -30, opacity: 0, filter: "blur(4px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 150 }}
                  className="block font-heading text-sm text-muted-foreground hover:text-primary transition-colors py-2.5 px-4 rounded-lg hover:bg-primary/5"
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
