import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogOut, User } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AuthNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    setLocation("/");
  };

  const scrollToSection = (sectionId: string) => {
    if (location === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    } else {
      setLocation("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
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

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/50 text-white text-sm">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <User className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    data-testid="button-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {location !== "/login" && location !== "/signup" && (
                  <>
                    <Link href="/signup">
                      <Button
                        variant="outline"
                        className="hidden md:inline-flex"
                        data-testid="button-signup"
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        variant="default"
                        className="hidden md:inline-flex"
                        data-testid="button-get-started"
                      >
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </>
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
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleLogout}
                  data-testid="button-mobile-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </Button>
              ) : (
                <>
                  {location !== "/login" && location !== "/signup" && (
                    <>
                      <Link href="/signup">
                        <Button
                          variant="outline"
                          className="w-full"
                          data-testid="button-mobile-signup"
                        >
                          Sign Up
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button
                          variant="default"
                          className="w-full"
                          data-testid="button-mobile-get-started"
                        >
                          Log In
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
