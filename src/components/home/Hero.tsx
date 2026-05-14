"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Hero() {

  const socialLinks: { href: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { href: "https://github.com/mrrayhan0102", Icon: FaGithub },
    { href: "https://www.linkedin.com/in/mrrayhan0102", Icon: FaLinkedin },
    { href: "https://twitter.com/mrrayhan0102", Icon: FaTwitter },
  ]

  return (
    <section className="relative flex items-center pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for New Projects
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                Creating <span className="text-primary italic">exceptional</span> <br />
                digital solutions.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                I'm <span className="text-foreground font-semibold">Abu Rayhan</span>, a Full-stack Engineer 
                crafting high-performance web applications with modern aesthetics and seamless user experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center gap-2 group transition-all cursor-pointer"
              >
                Let's Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-border bg-card/50 backdrop-blur-sm px-8 py-4 rounded-full font-bold hover:bg-muted transition-all cursor-pointer"
              >
                View My Work
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-8 border-t border-border/50 w-fit">
              {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "var(--color-primary)" }}
                  className="text-muted-foreground transition-colors cursor-pointer"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex-1 relative group"
          >
            <div className="relative z-10 w-full max-w-[500px] mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/Beauty_of_eyes.jpeg"
                alt="Abu Rayhan"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Floating Card UI Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 bg-card/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-sm font-bold">111+ Projects</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 -left-10 z-20 bg-card/80 backdrop-blur-xl border border-border/50 p-5 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex gap-4 items-center">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expertise</p>
                  <p className="text-sm font-bold">Full Stack Dev</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
