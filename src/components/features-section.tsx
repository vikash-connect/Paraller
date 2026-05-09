"use client";
import React from "react";
import { motion } from "framer-motion";
import { MonitorPlay, Route, Clock3, UserCheck } from "lucide-react";

const features = [
  {
    title: "Interactive Simulations",
    description: "Step into realistic scenarios and solve industry-standard problems in real-time.",
    icon: <MonitorPlay className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "AI Career Mapping",
    description: "Our AI analyzes your decisions to build a dynamic map of your ideal future roles.",
    icon: <Route className="w-6 h-6 text-purple-400" />,
  },
  {
    title: "Future Timeline",
    description: "Visualize the exact trajectory from high school to a senior engineering position.",
    icon: <Clock3 className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Personalized Role Matching",
    description: "Match with roles based on your innate problem-solving style and simulation results.",
    icon: <UserCheck className="w-6 h-6 text-pink-400" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-primary tracking-widest uppercase"
          >
            Core Engine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading"
          >
            Everything you need to discover your path
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white font-heading z-10">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-neutral-400 z-10">
                  <p className="flex-auto text-lg mb-2 font-medium text-white">{feature.title}</p>
                  <p>{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
