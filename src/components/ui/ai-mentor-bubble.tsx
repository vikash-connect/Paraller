"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterEffect } from "./typewriter-effect";
import { Sparkles } from "lucide-react";

interface AIMentorBubbleProps {
  message: string;
  isVisible?: boolean;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export function AIMentorBubble({ 
  message, 
  isVisible = true, 
  className = "", 
  speed = 30,
  onComplete 
}: AIMentorBubbleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          className={`relative flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] group ${className}`}
        >
          {/* Pulsing AI Indicator */}
          <div className="relative mt-1 flex-shrink-0">
            <div className="absolute inset-0 bg-primary/40 blur-md rounded-full animate-pulse" />
            <div className="relative w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary">
              <Sparkles size={16} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase opacity-60">AI Guide // Guidance</span>
            <div className="text-neutral-200 text-sm md:text-base leading-relaxed font-medium">
              <TypewriterEffect 
                text={message} 
                speed={speed} 
                onComplete={onComplete} 
              />
            </div>
          </div>

          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 rounded-bl-2xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
