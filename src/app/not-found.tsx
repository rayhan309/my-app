"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { JSX } from "react";

export default function NotFound(): JSX.Element {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center"
        >
          <div className="relative">
            <Ghost className="w-32 h-32 text-primary/20" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <h1 className="text-9xl font-black tracking-tighter text-foreground/10 select-none">
                404
              </h1>
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found
          </h2>
          <p className="text-lg text-muted-foreground max-w-[500px] mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, 
            deleted, or maybe it never existed in the first place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-border bg-card text-card-foreground px-8 py-3 rounded-full font-semibold hover:bg-muted transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    </div>
  );
}
