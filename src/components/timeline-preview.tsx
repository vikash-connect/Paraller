"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    phase: "Phase 1: Discovery",
    title: "Basic Foundations",
    description: "Learn the core concepts of programming, systems, and design thinking without writing complex code.",
    year: "Year 1",
  },
  {
    phase: "Phase 2: Simulation",
    title: "Roleplay Engineering",
    description: "Enter a simulated tech company. Work on sprint tickets, debug simulated outages, and collaborate with AI colleagues.",
    year: "Year 2",
  },
  {
    phase: "Phase 3: Specialization",
    title: "Deep Dive Projects",
    description: "Choose your domain. Build production-level apps, train models, or secure networks in a high-stakes environment.",
    year: "Year 3",
  },
  {
    phase: "Phase 4: Mastery",
    title: "Industry Readiness",
    description: "Graduate from the simulation with a verified portfolio of real-world skills and experiences, ready for a real tech career.",
    year: "Year 4",
  },
];

export function TimelinePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
          Your Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Timeline</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          See exactly how you'll progress from a curious student to an industry-ready professional.
        </p>
      </div>

      <div className="relative">
        {/* Central Line Background */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-cyan-400 to-emerald-500 -translate-x-1/2 rounded-full origin-top"
          style={{ height: lineHeight }}
        />

        <div className="space-y-24">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={event.phase} className="relative flex items-center md:justify-between w-full">
                
                {/* Timeline Dot */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary -translate-x-1/2 z-10 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                  />
                </div>

                {/* Content Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`ml-16 md:ml-0 w-full md:w-[45%] ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
                >
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-colors backdrop-blur-md">
                    <span className="text-primary text-sm font-bold tracking-wider uppercase mb-2 block">{event.year} • {event.phase}</span>
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{event.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
