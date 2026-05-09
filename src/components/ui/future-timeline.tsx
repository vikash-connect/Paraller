"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, DollarSign, Home, TrendingUp, Heart, AlertCircle, MapPin } from "lucide-react";

const milestones = [
  {
    year: "2026",
    title: "The Genesis",
    role: "Core Foundations",
    salary: "$0 - $20k",
    lifestyle: "Late nights, shared dorms, high caffeine, and pure curiosity.",
    environment: "University Labs & Global Hackathons",
    growth: "Mastering the fundamentals of logic and secure architectures.",
    outcome: "The thrill of seeing your first complex system come to life.",
    challenge: "Managing the steep learning curve of advanced cryptography.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    year: "2028",
    title: "The Breakthrough",
    role: "Junior Security Strategist",
    salary: "$50k - $75k",
    lifestyle: "First apartment in a tech hub, hybrid freedom, expanding network.",
    environment: "Hyper-growth Fintech Startup",
    growth: "Real-world incident response and defensive engineering.",
    outcome: "Confidence building as you stop your first live production breach.",
    challenge: "Handling the high-velocity pressure of a startup launch.",
    color: "from-cyan-400 to-emerald-400"
  },
  {
    year: "2030",
    title: "Industry Impact",
    role: "Senior Security Architect",
    salary: "$120k - $160k",
    lifestyle: "Financial stability, travel-ready, premium workspace setup.",
    environment: "Global Cybersecurity Firm (Hybrid/Remote)",
    growth: "Designing resilient systems for millions of users.",
    outcome: "The pride of knowing your code protects global financial privacy.",
    challenge: "Balancing complex security needs with seamless user experience.",
    color: "from-emerald-400 to-yellow-400"
  },
  {
    year: "2033",
    title: "Mastery & Vision",
    role: "Principal Security Consultant",
    salary: "$200k - $280k+",
    lifestyle: "Homeownership, family-first flexibility, high autonomy.",
    environment: "Boutique Consultancy / Remote Global",
    growth: "High-level strategic advisory and mentoring next-gen talent.",
    outcome: "Respect as a thought leader in the international security space.",
    challenge: "Communicating deeply technical risks to non-technical executives.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    year: "2035",
    title: "Legacy & Leadership",
    role: "CISO / Founder",
    salary: "$350k+ Equity",
    lifestyle: "True financial independence, philanthropy, mentorship.",
    environment: "The Boardroom / Your Own Studio",
    growth: "Defining the future of ethical and secure technology.",
    outcome: "The fulfillment of a career built on protecting and empowering people.",
    challenge: "Staying ahead of AI-driven threats in a hyper-connected world.",
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
                className={`ml-16 md:ml-0 w-full md:w-[50%] ${isEven ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}
              >
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:border-white/30 transition-all duration-500 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${milestone.color}`} />
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="px-4 py-2 bg-white/5 rounded-2xl flex items-center gap-2 border border-white/10">
                      <Calendar size={14} className="text-primary" />
                      <span className="text-sm font-mono font-bold text-white">{milestone.year}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">{milestone.title}</span>
                  </div>

                  <h3 className="text-3xl font-bold font-heading text-white mb-8 tracking-tight">
                    {milestone.role}
                  </h3>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <DollarSign size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Financial Power</span>
                          <span className="text-white font-medium">{milestone.salary}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Base of Operations</span>
                          <span className="text-neutral-300 leading-tight">{milestone.environment}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          <Heart size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Life Outcome</span>
                          <span className="text-neutral-300 leading-tight">{milestone.outcome}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <Home size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Lifestyle</span>
                          <span className="text-neutral-300 leading-tight">{milestone.lifestyle}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          <TrendingUp size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Key Growth</span>
                          <span className="text-neutral-300 leading-tight">{milestone.growth}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                          <AlertCircle size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Modern Challenge</span>
                          <span className="text-neutral-300 leading-tight">{milestone.challenge}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background Aura */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none`} />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
