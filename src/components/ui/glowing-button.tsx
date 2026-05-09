"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative group px-8 py-3 font-semibold text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full overflow-hidden",
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-r from-primary/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-px rounded-full border border-white/20 group-hover:border-primary/50 transition-colors duration-500 z-0 pointer-events-none"></div>
      </motion.button>
    );
  }
);

GlowingButton.displayName = "GlowingButton";
