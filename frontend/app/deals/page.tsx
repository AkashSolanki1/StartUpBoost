"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['All', 'Cloud', 'Productivity', 'Analytics', 'Marketing'];

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]); 
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/deals');
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        console.error("Failed to fetch deals from server");
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'All' || deal.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, deals]);

  if (loading) return <div className="p-20 text-center animate-pulse text-slate-500">Loading catalog...</div>;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      <header className="mb-12">
        <motion.h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Exclusive <span className="text-blue-500">Perks</span>
        </motion.h2>
        <p className="text-slate-400 text-lg">Power your startup with premium tools from our partners.</p>
      </header>

 
      <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeTab === cat ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredDeals.map((deal) => (
            <motion.div
              layout
              key={deal._id}
              className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              {deal.isLocked && (
                <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-500 p-2 rounded-lg">
                  <Lock className="w-4 h-4" />
                </div>
              )}
              
              <div>
                <span className="text-xs font-bold text-blue-500 uppercase">{deal.category}</span>
                <h3 className="text-2xl font-bold mt-1">{deal.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{deal.partnerName}</p>
                <p className="text-2xl font-black text-emerald-400 mt-4">{deal.benefitValue}</p>
              </div>
              
             
              <Link href={`/deals/${deal._id}`} className="mt-8">
                <button className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}