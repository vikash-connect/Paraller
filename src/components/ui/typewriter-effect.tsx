"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useUserStore } from "@/store/user-store";

interface TypewriterProps {
  text: string;
  speed?: number; // Not used in word-reveal but kept for prop compatibility
  delay?: number; // initial delay before starting
  onComplete?: () => void;
  className?: string;
}

export function TypewriterEffect({ text, delay = 0, onComplete, className = "" }: TypewriterProps) {
  const { isDemoMode } = useUserStore();
  const words = text.split(" ");
  
  // Calculate timing based on demo mode
  const staggerDuration = isDemoMode ? 0.05 : 0.15;
  const initialDelay = isDemoMode ? delay / 4000 : delay / 1000;

  useEffect(() => {
    if (onComplete) {
      const totalDuration = (initialDelay + (words.length * staggerDuration)) * 1000 + 500;
      const timer = setTimeout(onComplete, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [text, words.length, staggerDuration, initialDelay, onComplete]);

  return (
    <div className={`flex flex-wrap gap-x-1.5 gap-y-0.5 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: initialDelay + i * staggerDuration,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
