"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/user-store";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before starting
  onComplete?: () => void;
  className?: string;
}

export function TypewriterEffect({ text, speed = 30, delay = 0, onComplete, className = "" }: TypewriterProps) {
  const { isDemoMode } = useUserStore();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Speed up typing in demo mode
  const effectiveSpeed = isDemoMode ? Math.max(1, speed / 4) : speed;

  useEffect(() => {
    // Reset state when text changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedText("");
    setIsTyping(false);

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      const intervalId = setInterval(() => {
        if (currentIndex < text.length - 1) {
          setDisplayedText((prev) => prev + text[currentIndex]);
          currentIndex++;
        } else {
          setDisplayedText(text); // Ensure full text is set
          clearInterval(intervalId);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, effectiveSpeed);

      // Store interval ID in timeoutId to clear on unmount (hacky, but works for cleanup)
      timeoutId = intervalId as unknown as NodeJS.Timeout;
    };

    const delayId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayId);
      clearInterval(timeoutId as unknown as number);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[0.5em] h-[1em] bg-current ml-1 align-middle opacity-70"
        />
      )}
    </span>
  );
}
