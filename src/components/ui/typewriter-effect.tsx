"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/user-store";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before starting
  onComplete?: () => void;
  className?: string;
}

export function TypewriterEffect({ text, speed = 20, delay = 0, onComplete, className = "" }: TypewriterProps) {
  const { isDemoMode } = useUserStore();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const animationStarted = useRef(false);
  const textRef = useRef(text);
  
  const effectiveSpeed = isDemoMode ? Math.max(1, speed / 4) : speed;

  useEffect(() => {
    // If text changes, we reset the flag to allow re-typing the new message
    if (textRef.current !== text) {
      textRef.current = text;
      animationStarted.current = false;
      setDisplayedText("");
    }

    if (animationStarted.current) return;
    animationStarted.current = true;

    let currentIndex = 0;
    let intervalId: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          if (onComplete) {
            // Short delay after completion before triggering callback
            setTimeout(onComplete, 150);
          }
        }
      }, effectiveSpeed);
    };

    const delayId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, onComplete, effectiveSpeed]);

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
