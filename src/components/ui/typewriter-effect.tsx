"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number; // Kept for backward compatibility
  delay?: number; // ms before reveal
  onComplete?: () => void;
  className?: string;
}

export function TypewriterEffect({ text, delay = 0, onComplete, className = "" }: TypewriterProps) {
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, delay + 400); // 400ms is the duration of our animation
      return () => clearTimeout(timer);
    }
  }, [text, delay, onComplete]);

  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.4, 
        delay: delay / 1000, 
        ease: [0.23, 1, 0.32, 1] // Custom quint ease for premium feel
      }}
      className={className}
    >
      {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-[2px] h-[1.1em] bg-primary ml-2 align-middle shadow-[0_0_8px_rgba(6,182,212,0.5)]"
      />
    </motion.div>
  );
}
