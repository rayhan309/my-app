"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-border/40">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl font-bold mb-12">About Me</h2>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl">
            I love turning complex problems into simple, beautiful and intuitive designs. 
            When I'm not coding, you'll find me exploring new technologies or sharing my knowledge 
            with the developer community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
