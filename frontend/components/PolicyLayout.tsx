"use client";
import { motion } from 'framer-motion';

interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-[2.5rem]"
      >
        <h1 className="text-4xl font-black mb-8 text-white">{title}</h1>
        <div className="prose prose-invert prose-slate max-w-none">
          {children}
        </div>
      </motion.div>
    </div>
  );
}