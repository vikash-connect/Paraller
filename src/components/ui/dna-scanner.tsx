"use client";
import React from "react";
import { motion } from "framer-motion";

interface DNAScannerProps {
  label: string;
  value: number;
  delay?: number;
  color?: string;
}

export function DNAScanner({ label, value, delay = 0, color = "cyan" }: DNAScannerProps) {
  const colorMap: Record<string, string> = {
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500"
  };

  const shadowMap: Record<string, string> = {
    cyan: "shadow-[0_0_15px_rgba(6,182,212,0.4)]",
    purple: "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    emerald: "shadow-[0_0_15px_rgba(16,185,129,0.4)]",
    red: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    orange: "shadow-[0_0_15px_rgba(249,115,22,0.4)]",
    blue: "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    yellow: "shadow-[0_0_15px_rgba(234,179,8,0.4)]"
  };

  return (
    <div className="flex flex-col gap-2 w-full group">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
        <span>{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      
      <div className="h-2 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
        {/* Animated Scanline overlay */}
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
          className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
        />

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full ${colorMap[color]} ${shadowMap[color]} relative`}
        >
          {/* Glowing head of the progress bar */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_#fff]" />
        </motion.div>
      </div>
    </div>
  );
}
