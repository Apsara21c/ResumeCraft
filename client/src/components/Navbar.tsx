import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", action: () => scrollToSection("home") },
    { label: "Features", action: () => scrollToSection("features") },
    { label: "Pricing", action: () => scrollToSection("pricing") },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl md:text-2xl font-black gradient-text cursor-pointer"
              data-testid="link-logo"
            >
              ResumeBuilder
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                onClick={link.action || (() => {})}
                asChild={!!link.href}
                data-testid={`button-nav-${link.label.toLowerCase()}`}
              >
                {link.href ? (
                  <Link href={link.href}>{link.label}</Link>
                ) : (
                  <span>{link.label}</span>
                )}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {location !== "/login" && location !== "/signup" && (
              <Link href="/login">
                <Button
                  variant="default"
                  className="hidden md:inline-flex"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </Link>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={link.action || (() => {})}
                  asChild={!!link.href}
                  data-testid={`button-mobile-${link.label.toLowerCase()}`}
                >
                  {link.href ? (
                    <Link href={link.href}>{link.label}</Link>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </Button>
              ))}
              {location !== "/login" && location !== "/signup" && (
                <Link href="/login">
                  <Button
                    variant="default"
                    className="w-full"
                    data-testid="button-mobile-get-started"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
