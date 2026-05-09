"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, DollarSign, Home, Briefcase, TrendingUp } from "lucide-react";

const milestones = [
  {
    year: "2026",
    title: "Foundational Learning",
    role: "Computer Science Student",
    salary: "$0 - $20k (Part-time)",
    lifestyle: "Dorm life, late-night coding, hackathons",
    environment: "University labs, remote study",
    growth: "Building core programming and networking skills.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    year: "2028",
    title: "The Breakthrough",
    role: "Cybersecurity Intern",
    salary: "$40k - $60k (Pro-rated)",
    lifestyle: "First apartment, networking, fast-paced learning",
    environment: "Hybrid startup environment",
    growth: "Learning to use enterprise security tools in real-time.",
    color: "from-cyan-400 to-emerald-400"
  },
  {
    year: "2030",
    title: "Industry Entry",
    role: "Junior SOC Analyst",
    salary: "$85k - $110k",
    lifestyle: "Stable income, building savings, city living",
    environment: "Corporate Security Operations Center (On-site)",
    growth: "Handling active alerts, incident response fundamentals.",
    color: "from-emerald-400 to-yellow-400"
  },
  {
    year: "2033",
    title: "Career Specialization",
    role: "Senior Threat Hunter",
    salary: "$140k - $180k+",
    lifestyle: "Homeownership, traveling, work-life balance",
    environment: "Remote-first, high autonomy",
    growth: "Leading incident investigations and mentoring juniors.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    year: "2035",
    title: "Mastery & Leadership",
    role: "Director of Security / CISO",
    salary: "$250k+",
    lifestyle: "Financial independence, speaking at conferences",
    environment: "Executive suite, global strategy",
    growth: "Shaping company-wide security culture and infrastructure.",
    color: "from-orange-500 to-red-500"
  }
];

export function FutureTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-24 px-4 sm:px-6">
      
      {/* Background Central Line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full" />
      
      {/* Animated Glowing Progress Line */}
      <motion.div 
        className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 to-red-500 -translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_rgba(6,182,212,0.8)]"
        style={{ height: lineHeight }}
      />

      <div className="space-y-32">
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={milestone.year} className="relative flex items-center md:justify-between w-full">
              
              {/* Glowing Node */}
              <div className="absolute left-[28px] md:left-1/2 w-8 h-8 rounded-full bg-black border-4 border-black shadow-[0_0_0_2px_rgba(255,255,255,0.2)] -translate-x-1/2 z-10 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`w-full h-full rounded-full bg-gradient-to-br ${milestone.color} animate-pulse shadow-[0_0_20px_currentColor]`}
                />
              </div>

              {/* Floating Glassmorphic Card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className={`ml-16 md:ml-0 w-full md:w-[45%] ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
              >
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${milestone.color}`} />
                  
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-white/10 rounded-full flex items-center gap-2">
                      <Calendar size={14} className="text-cyan-400" />
                      <span className="text-sm font-mono font-bold text-white tracking-wider">{milestone.year}</span>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">{milestone.title}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">
                    {milestone.role}
                  </h3>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-4 text-sm font-mono">
                    <div className="flex items-start gap-3">
                      <DollarSign className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="text-neutral-500 block mb-1 uppercase text-xs">Salary Projection</span>
                        <span className="text-white font-medium">{milestone.salary}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Home className="text-cyan-400 shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="text-neutral-500 block mb-1 uppercase text-xs">Lifestyle</span>
                        <span className="text-neutral-300">{milestone.lifestyle}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="text-purple-400 shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="text-neutral-500 block mb-1 uppercase text-xs">Environment</span>
                        <span className="text-neutral-300">{milestone.environment}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mt-2 pt-4 border-t border-white/10">
                      <TrendingUp className="text-yellow-400 shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="text-neutral-500 block mb-1 uppercase text-xs">Key Growth</span>
                        <span className="text-neutral-200 italic">{milestone.growth}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
