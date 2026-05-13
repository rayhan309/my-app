"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "#", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          RAYHAN
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative text-sm font-medium text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                layoutId="navbar-underline"
              />
            </motion.a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
          >
            {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
          </button>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
          >
            {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              ))}
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold mt-2">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
