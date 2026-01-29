"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert, ChevronLeft, Zap } from 'lucide-react';

export default function DealDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/deals/${id}`);
        if (!res.ok) throw new Error("Deal not found");
        const data = await res.json();
        setDeal(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleClaim = async () => {
    const token = localStorage.getItem('token');
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) return router.push('/auth/login');

    if (deal.isLocked && !user.isVerified) {
      alert("Verification required! Please verify your account in the Dashboard.");
      return router.push('/dashboard');
    }

    try {
      const res = await fetch('http://localhost:5000/api/claims', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ dealId: id })
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert(data.message || "Claim failed.");
      }
    } catch (err) {
      alert("Connection error. Is your backend running?");
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-500">Loading Perk Details...</div>;
  if (!deal) return <div className="p-20 text-center">Deal not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 min-h-screen">
      <button 
        onClick={() => router.push('/deals')} 
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Deals
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-4">
               <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                {deal.category}
              </span>
              {deal.isLocked && (
                 <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <ShieldAlert className="w-3 h-3" />
                  Verified Only
                </span>
              )}
            </div>
            
            <h1 className="text-5xl font-black mb-6 tracking-tight">{deal.title}</h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-8">{deal.description}</p>
            
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-bold">Inclusions</h3>
              {['Priority Support', 'Full API Access', 'Startup Community Access'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2rem shadow-2xl sticky top-10">
            <div className="mb-8">
              <p className="text-slate-500 text-sm font-medium mb-1">Benefit Value</p>
              <h2 className="text-3xl font-black text-emerald-400">{deal.benefitValue}</h2>
            </div>

            <div className="space-y-4 mb-8 border-t border-slate-800 pt-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Partner</span>
                <span className="text-white font-bold">{deal.partnerName}</span>
              </div>
            </div>

            <button 
              onClick={handleClaim}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20"
            >
              <Zap className="w-4 h-4 fill-current" />
              Claim Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}