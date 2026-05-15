"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export default function FinalSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="pb-10 md:pb-20 pt-10 md:pt-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Big Concluding Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-6"
          >
            <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none opacity-10 select-none ${jakartaSans.className}`}>
              ABU RAYHAN
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Merging artistic vision with engineering precision to create 
              digital experiences that resonate and endure.
            </p>
          </motion.div>

          {/* Social & Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-8"
          >
            {/* Copyright & Tagline */}
            <div className="text-sm text-muted-foreground font-medium text-center md:text-left">
              <p>© {currentYear} Abu Rayhan. Built with passion and precision.</p>
              <p className="opacity-50">Dhaka, Bangladesh — Available Worldwide</p>
            </div>

            {/* Social Links (Minimalist) */}
            <div className="flex items-center gap-8">
              {[
                { Icon: FaGithub, href: "https://github.com/rayhan309" },
                { Icon: FaLinkedin, href: "https://www.linkedin.com/in/abu-rayhan-undefined-2514b5390/" },
                { Icon: FaTwitter, href: "https://x.com/AbuRayhan1818" },
                { Icon: FaFacebook, href: "https://facebook.com/aburayhan1818/" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-primary">System Online</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
