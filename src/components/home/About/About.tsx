"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Code2, Cpu, Globe2, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const features = [
  {
    icon: Code2,
    title: "Clean Architecture",
    description: "Building scalable and maintainable systems using industry best practices and clean code principles.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Optimizing every line of code to ensure lightning-fast load times and smooth user interactions.",
  },
  {
    icon: ShieldCheck,
    title: "Robust Security",
    description: "Implementing industry-standard security measures to protect user data and ensure system integrity.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "Solving complex problems with creative and efficient technical approaches.",
  },
];

export default function About() {
  return (
    <section id="about" data-reveal className="py-24 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-semibold tracking-wider uppercase text-sm"
              >
                My Story & Philosophy
              </motion.span>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}>
                Crafting Digital <br />
                <span className="text-muted-foreground">Excellence.</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a passionate <span className="text-foreground font-medium">Senior Full-stack Engineer</span> with 
                a deep-rooted love for building software that makes an impact. My journey in the tech world 
                has been driven by a relentless curiosity for how things work and a desire to build 
                tools that solve real-world problems.
              </p>
              <p>
                At <Link href="https://flexshipit.com" target="_blank" className="text-primary font-bold hover:underline transition-all">FlexShip IT</Link>, I lead technical initiatives 
                that bridge the gap between complex backend engineering and intuitive frontend experiences. 
                I believe that great software is not just about code, but about understanding the human 
                experience behind every click.
              </p>
            </div>

            {/* Quick Stats/Highlights */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-3xl font-bold text-foreground">05+</h4>
                <p className="text-sm text-muted-foreground">Years of Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-foreground">111+</h4>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 rounded-md bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
