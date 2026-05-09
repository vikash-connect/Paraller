"use client";
import React from "react";
import { motion } from "framer-motion";

interface StatsBarProps {
  label: string;
  value: number; // 0 to 100
  colorClass?: string;
  delay?: number;
}

export function StatsBar({ label, value, colorClass = "from-cyan-400 to-blue-500", delay = 0 }: StatsBarProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between text-xs font-mono mb-1">
        <span className="text-neutral-400 uppercase tracking-wider">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorClass}`}
          style={{ boxShadow: "0 0 10px currentColor" }}
        />
      </div>
    </div>
  );
}
