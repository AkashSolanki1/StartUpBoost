"use client";
import { motion } from 'framer-motion';
import HeroVisual from '@/components/HeroVisual';
import { ArrowRight, Zap, Shield, Globe, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen bg-slate-950 overflow-x-hidden">
     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-6xl bg-blue-600/10 blur-[120px] rounded-full" />

     
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
            <Star className="w-3 h-3 fill-current" />
            <span>Trusted by 500+ Early Stage Teams</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            Scale Smarter. <br />
            <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Spend Less.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Stop burning your seed round on full-price SaaS. Unlock $50k+ in credits 
            from AWS, Stripe, and Notion designed specifically for founders.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link href="/deals">
              <button className="group bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all shadow-xl shadow-white/10">
                Explore All Perks
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-2xl border border-slate-800 text-white font-bold hover:bg-slate-900 transition-all">
              Partner with Us
              
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full relative h-[400px] md:h-[500px]"
        >
          <HeroVisual />
        </motion.div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-amber-400" />}
            title="Instant Access"
            desc="Get your credits approved within 24 hours of verification."
          />
          <FeatureCard 
            icon={<Shield className="text-blue-400" />}
            title="Founder Verified"
            desc="Exclusive deals restricted to genuine early-stage startups."
          />
          <FeatureCard 
            icon={<Globe className="text-emerald-400" />}
            title="Global Partners"
            desc="Credits available for founders in 150+ countries."
          />
        </div>
      </section>

    
      <section className="py-12 bg-slate-900/20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-center items-center font-bold text-3xl mb-5 text-gray-400 pb-5"> Our Partners & Collaborations</div>
        <div className="flex justify-around items-center opacity-30 grayscale gap-12 px-6">
        
           <span className="text-2xl font-bold">AMAZON</span>
           <span className="text-2xl font-bold">STRIPE</span>
           <span className="text-2xl font-bold">NOTION</span>
           <span className="text-2xl font-bold">SEGMENT</span>
           <span className="text-2xl font-bold">INTERCOM</span>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}