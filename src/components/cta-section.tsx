"use client";
import React from "react";
import { GlowingButton } from "./ui/glowing-button";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-white font-heading tracking-tight mb-8"
        >
          Ready to meet your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            future self?
          </span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto font-light"
        >
          Join thousands of students who have already discovered their path. The simulation awaits.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <GlowingButton className="px-12 py-5 text-lg">
            Initialize Sequence
          </GlowingButton>
        </motion.div>
      </div>
    </section>
  );
}
