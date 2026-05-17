"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Icon } from "lucide-react";
import { RiArrowRightLongFill } from "react-icons/ri";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
// Plus Jakarta Sans
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export default function Hero() {

  const socialLinks: { href: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { href: "https://github.com/rayhan309", Icon: FaGithub },
    { href: "https://www.linkedin.com/in/abu-rayhan-undefined-2514b5390/", Icon: FaLinkedin },
    { href: "https://x.com/AbuRayhan1818", Icon: FaTwitter },
    { href: "https://facebook.com/aburayhan1818/", Icon: FaFacebook },
  ]

  return (
    <section className="relative flex items-center pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-left space-y-8 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for New Projects
            </div>

            <div className="space-y-4">
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}>
                Building <span className="text-primary italic">exceptional</span> <br />
                digital solutions.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
                I'm <span className="text-foreground font-semibold">Abu Rayhan</span>, Senior Full-stack Engineer at
                <Link href="https://flexshipit.com" target="_blank" className="text-primary font-bold hover:underline transition-all"> FlexShip IT</Link>. I architect high-performance web applications
                that merge modern aesthetics with robust, scalable engineering.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
              // navigate to whats app
                href="https://wa.me/8801621807642?text=Hi! I'm interested in working with you."
                target="_blank"
                // whileHover={{ scale: 1.05 }}
                // 
                // onClick={() => window.location.href = "/contact"}
                // whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center gap-2 group transition-all cursor-pointer"
              >
                Let's Talk
                <RiArrowRightLongFill className="w-5 h-5 group-hover:translate-x-2 duration-500 ease-in-out opacity-50 transition-transform" />
              </Link>
              <motion.button
                // whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-border bg-card/50 backdrop-blur-sm px-8 py-4 rounded-full font-bold hover:bg-muted transition-all cursor-pointer"
              >
                View My Work
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-8 border-t border-border/50 w-fit">
              {socialLinks.map((Social, i) => (
                <motion.a
                  key={i}
                  href={Social.href}
                  target="_blank"
                  whileHover={{ y: -5, color: "var(--color-primary)" }}
                  className="text-muted-foreground transition-colors cursor-pointer"
                >
                  <Social.Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex-1 relative group order-1 lg:order-2"
          >
            <div className="relative z-10 w-full max-w-[500px] mx-auto aspect-square rounded-md overflow-hidden shadow-2xl border border-white/10">
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
              className="absolute -top-6 -right-6 z-20 bg-card/80 backdrop-blur-xl border border-border/50 p-4 rounded-md shadow-xl hidden md:block"
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

            {/* <motion.div
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
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
