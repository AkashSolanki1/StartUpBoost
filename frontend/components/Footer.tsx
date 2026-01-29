"use client";
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, FileText, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-t border-white/10 p-4 md:p-6">
      <div className=" pl-10 pr-10 flex flex-col md:flex-row justify-between items-center gap-4">
        
       
        <div className="text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} <span className="text-blue-500">StartupBoost</span>. Empowering Founders.
        </div>

       
        <div className="flex items-center gap-15 space-x-6">
          <FooterLink href="/privacy" icon={<ShieldCheck className="w-4 h-4" />} label="Privacy" />
          <FooterLink href="/terms" icon={<FileText className="w-4 h-4" />} label="Terms" />
          <FooterLink href="/contact" icon={<Mail className="w-4 h-4" />} label="Contact" />
        </div>

       
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-bold">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Operational
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, color: '#3b82f6' }}
      className="flex items-center gap-2 text-sm text-slate-400 transition-colors"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </motion.a>
  );
}