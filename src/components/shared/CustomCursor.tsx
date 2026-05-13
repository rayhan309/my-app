"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const moveMouse = useCallback((e: MouseEvent) => {
    // কার্সারকে সেন্টারে রাখার জন্য পজিশন সেট করা
    cursorX.set(e.clientX - (isHovered ? 24 : 8));
    cursorY.set(e.clientY - (isHovered ? 24 : 8));
  }, [cursorX, cursorY, isHovered]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest(".hover-target")
    ) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [moveMouse, handleMouseOver]);

  return (
    <motion.div
      className="fixed top-0 left-0 border border-accent rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{
        width: isHovered ? 48 : 16,
        height: isHovered ? 48 : 16,
        backgroundColor: isHovered ? "var(--color-accent-20, rgba(37, 99, 235, 0.1))" : "transparent",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}
