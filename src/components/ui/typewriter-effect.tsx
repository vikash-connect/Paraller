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
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Use refs to track animation state across renders without triggering effects
  const animationStarted = useRef(false);
  const currentTextRef = useRef("");
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  const effectiveSpeed = isDemoMode ? Math.max(1, speed / 4) : speed;

  // Cleanup helper
  const clearAllTimers = () => {
    timeoutIds.current.forEach(id => {
      clearTimeout(id);
      clearInterval(id as unknown as number);
    });
    timeoutIds.current = [];
  };

  useEffect(() => {
    // Reset if the text actually changed
    if (currentTextRef.current !== text) {
      clearAllTimers();
      currentTextRef.current = text;
      animationStarted.current = false;
      setDisplayedText("");
      setIsTyping(false);
      setTypingComplete(false);
    }

    // Guard against duplicate runs in Strict Mode or re-renders
    if (animationStarted.current) return;
    animationStarted.current = true;

    const startTyping = () => {
      setIsTyping(true);
      let charIndex = 0;
      
      const intervalId = setInterval(() => {
        charIndex++;
        setDisplayedText(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          setTypingComplete(true);
          
          const completionTimer = setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // 500ms pause after completion as requested
          timeoutIds.current.push(completionTimer);
        }
      }, effectiveSpeed);
      
      timeoutIds.current.push(intervalId as unknown as NodeJS.Timeout);
    };

    const initialDelayId = setTimeout(startTyping, delay);
    timeoutIds.current.push(initialDelayId);

    return () => clearAllTimers();
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
