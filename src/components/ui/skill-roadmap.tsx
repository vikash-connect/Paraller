"use client";
import React from "react";
import { motion } from "framer-motion";
import { roadmaps } from "@/data/roadmaps";
import { CheckCircle2, Clock, Zap, BookOpen, Rocket, ChevronRight } from "lucide-react";

interface SkillRoadmapProps {
  careerId: string;
}

export function SkillRoadmap({ careerId }: SkillRoadmapProps) {
  const roadmap = roadmaps[careerId] || roadmaps.cybersecurity;

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6 font-mono text-xs tracking-widest uppercase"
        >
          <BookOpen size={14} /> Learning Roadmap
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">Your Path to Mastery</h2>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
          {roadmap.overview}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: The Steps */}
        <div className="lg:col-span-7 flex flex-col gap-8 relative">
          {/* Connecting Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-white/10 hidden md:block" />

          {roadmap.steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-6 relative group"
            >
              <div className="hidden md:flex w-14 h-14 rounded-2xl bg-black border border-white/10 items-center justify-center relative z-10 shrink-0 group-hover:border-primary/50 transition-colors">
                <span className="text-lg font-mono font-bold text-neutral-500 group-hover:text-primary transition-colors">0{idx + 1}</span>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex-1 hover:bg-white/10 transition-all duration-300 backdrop-blur-xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h4 className="text-xl font-bold font-heading text-white">{step.title}</h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Clock size={12} /> {step.time}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-primary/5 border border-primary/20 text-[10px] font-mono text-primary uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
                {/* Checkmark placeholder */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="text-emerald-500/30" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Mission & Tools */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 p-10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Rocket size={80} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest mb-6 border border-primary/30">
              <Zap size={12} /> Your First Mission
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-white">{roadmap.firstMission.title}</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-8 italic">
              &quot;{roadmap.firstMission.description}&quot;
            </p>
            <button className="w-full py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all">
              Launch Project <ChevronRight size={18} />
            </button>
          </motion.div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
            <h4 className="text-sm font-mono text-neutral-500 mb-6 uppercase tracking-widest">Recommended Toolbelt</h4>
            <div className="space-y-4">
              {[
                { name: "Visual Studio Code", type: "Editor" },
                { name: "GitHub Desktop", type: "Version Control" },
                { name: "ChatGPT / Claude", type: "AI Mentor" },
                { name: "YouTube (FreeCodeCamp)", type: "Learning" }
              ].map((tool) => (
                <div key={tool.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-sm font-medium text-white">{tool.name}</span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">{tool.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
