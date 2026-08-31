"use client";

import { motion } from "framer-motion";

export default function PageHeader() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-12 pt-6 text-left md:pb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary"
      >
        Archive
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="font-display text-5xl leading-[0.95] md:text-7xl"
      >
        All projects.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="max-w-xl text-lg leading-8 text-muted-foreground"
      >
        A curated collection spanning platforms, products, and landing systems—each with a clear problem and a finished surface.
      </motion.p>
    </div>
  );
}
