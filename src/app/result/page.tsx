"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { RadarChart } from "@/components/ui/radar-chart";
import { StatsBar } from "@/components/ui/stats-bar";
import { GlowingButton } from "@/components/ui/glowing-button";
import { ShieldAlert, Zap, Cpu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { AIMentorBubble } from "@/components/ui/ai-mentor-bubble";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function ResultPage() {
  const { name } = useUserStore();

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen" />
        {/* Subtle grid pattern for technical feel */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column: Profile Summary & Radar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600" />
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono rounded-full animate-pulse">
                  98% MATCH
                </span>
                <span className="text-neutral-500 text-sm font-mono uppercase">Profile Analyzed</span>
              </div>
              
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                    Cybersecurity
                  </h1>
                  <h2 className="text-xl font-medium text-cyan-400">Analyst</h2>
                </div>
              </div>

              <div className="mt-8 flex justify-center py-4">
                <RadarChart 
                  data={[95, 60, 100, 70, 85]} 
                  labels={["Logic", "Creativity", "Analysis", "Leadership", "Execution"]} 
                  size={280} 
                />
              </div>
            </motion.div>

            {/* Metrics Panel */}
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" size={20} /> Career Metrics
              </h3>
              <div className="flex flex-col gap-4">
                <StatsBar label="Salary Growth Potential" value={92} colorClass="from-emerald-400 to-emerald-600" delay={0.5} />
                <StatsBar label="Job Demand (Next 5 Yrs)" value={98} colorClass="from-cyan-400 to-blue-500" delay={0.7} />
                <StatsBar label="Remote Flexibility" value={85} colorClass="from-purple-400 to-purple-600" delay={0.9} />
                <StatsBar label="High-Stress Incidents" value={75} colorClass="from-red-400 to-orange-500" delay={1.1} />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Insights & CTA */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold font-heading mb-6 text-white flex items-center gap-2">
                <Cpu className="text-primary" size={24} /> Personality Insights
              </h3>
              
              <div className="flex flex-col gap-8">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  “{name ? `${name}, your` : 'Your'} decision-making style shows <strong className="text-white">strong analytical and investigative tendencies</strong>. You thrive in high-stakes environments where logical deduction and system-level thinking are required to solve complex, hidden problems.”
                </p>

                <AIMentorBubble 
                  message={`Based on your simulation data, ${name || 'Agent'}, I see a natural aptitude for defensive strategy. Your focus on precision over panic is exactly what the future of global security requires.`}
                  speed={25}
                  className="bg-primary/5 border-primary/20"
                />
              </div>
              
              <div className="mt-10 pt-10 border-t border-white/5">
                <h4 className="text-sm font-mono text-neutral-500 mb-4 uppercase tracking-widest">Skills Alignment</h4>
                <div className="flex flex-wrap gap-3">
                  {["Threat Analysis", "Ethical Hacking", "Cryptography", "Network Security", "Incident Response"].map((skill, i) => (
                    <motion.span 
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + (i * 0.1) }}
                      className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
              <h3 className="text-2xl font-bold font-heading text-white mb-2 relative z-10">Future Opportunities</h3>
              <p className="text-neutral-300 mb-8 relative z-10">
                The demand for cybersecurity experts is growing exponentially. In the simulation, you will step into the shoes of a Junior Analyst at a top tech firm, defending against live cyber attacks.
              </p>
              
              <div className="relative z-10">
                <Link href="/simulation">
                  <GlowingButton className="w-full sm:w-auto px-8 py-4 text-lg shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    Enter Career Simulation <ChevronRight className="inline ml-2" />
                  </GlowingButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
