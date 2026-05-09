"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingButton } from "@/components/ui/glowing-button";
import { CareerCards } from "@/components/career-cards";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* Hero Section */}
      <AuroraBackground className="pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-6 items-center justify-center px-4 text-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-sm font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Simulate your future.
          </div>
          <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-center font-heading tracking-tight leading-tight max-w-4xl">
            Experience your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-gradient">
              future career
            </span>{" "}
            <br />
            before committing to it.
          </h1>
          <p className="font-light text-base md:text-xl text-neutral-300 py-4 max-w-2xl mx-auto">
            Parallel is a futuristic simulation platform for Class 11-12 students. 
            Dive into immersive modules for AI, Cybersecurity, Engineering, and more. 
            Discover your true calling.
          </p>
          <div className="pt-4">
            <GlowingButton>
              Start Simulation
            </GlowingButton>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute -bottom-32 animate-bounce text-muted-foreground"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </AuroraBackground>

      {/* Career Paths Section */}
      <section className="py-32 relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,50,255,0.05)_0%,black_70%)] pointer-events-none"></div>
        <div className="text-center mb-20 relative z-10 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4"
          >
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Timeline</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select a specialized path and experience a day in the life of an industry professional.
          </p>
        </div>
        
        <CareerCards />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center relative z-10 bg-black/50 backdrop-blur-md">
        <p className="text-muted-foreground font-light text-sm">
          © {new Date().getFullYear()} Parallel. Building the future of career discovery.
        </p>
      </footer>
    </div>
  );
}
