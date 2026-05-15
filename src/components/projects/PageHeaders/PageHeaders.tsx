"use client";

import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta-sans",
});

export default function PageHeader() {
    return (
         <div className="pt-5 pb-10 text-center max-w-4xl mx-auto space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-semibold tracking-wider uppercase text-sm"
        >
          My Portfolio
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] ${jakartaSans.className}`}
        >
          All <span className="text-muted-foreground">Projects.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          A curated collection of my work, ranging from complex full-stack applications 
          to sleek frontend experiences. Each project represents a unique challenge and solution.
        </motion.p>

        {/* Subtle separator */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-12"
        />
      </div>
    )
}