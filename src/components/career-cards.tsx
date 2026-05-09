"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { BrainCircuit, ShieldAlert, Code2, Database, Palette } from "lucide-react";

const careers = [
  {
    id: "ai",
    title: "AI Engineer",
    description: "Train models, build neural networks, and shape the future of machine learning.",
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: "cyber",
    title: "Cybersecurity Analyst",
    description: "Defend networks, perform ethical hacking, and protect digital assets from threats.",
    icon: <ShieldAlert className="w-8 h-8 text-red-400" />,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: "product",
    title: "Product Engineer",
    description: "Bridge the gap between frontend and backend, building robust full-stack applications.",
    icon: <Code2 className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/20 to-green-500/20",
  },
  {
    id: "data",
    title: "Data Scientist",
    description: "Analyze vast datasets, find hidden patterns, and drive data-backed decisions.",
    icon: <Database className="w-8 h-8 text-yellow-400" />,
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    description: "Craft immersive user experiences and build stunning, intuitive interfaces.",
    icon: <Palette className="w-8 h-8 text-pink-400" />,
    color: "from-pink-500/20 to-rose-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
};

export function CareerCards() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 z-10 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {careers.map((career) => (
        <motion.div
          key={career.id}
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="group relative bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/20 p-8 rounded-3xl overflow-hidden transition-colors duration-500 cursor-pointer"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${career.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10`} />
          <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
            {career.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 font-heading tracking-tight">{career.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{career.description}</p>
          <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
            Explore Path <span className="ml-2">→</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
