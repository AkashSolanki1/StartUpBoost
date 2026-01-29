"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LogOut, ExternalLink, ShieldCheck, CreditCard, LayoutGrid } from 'lucide-react';
import VerifyUser from '@/components/VerifyUser';

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/claims/my-claims', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 401) {
          localStorage.clear();
          router.push('/auth/login');
          return;
        }

        const data = await res.json();
        
        
        const validClaims = data.filter((c: any) => c.deal !== null);
        setClaims(validClaims);
        
        setUserData(JSON.parse(localStorage.getItem('user') || '{}'));
      } catch (err) {
        console.error("Dashboard Load Error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  if (loading) return <DashboardSkeleton />;

  const approvedCount = claims.filter((c: any) => c.status === 'approved').length;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800"
      >
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-blue-600 to-violet-600 flex items-center justify-center text-2xl font-bold shadow-xl shadow-blue-500/10 text-white">
            {userData?.name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{userData?.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-400 text-sm">{userData?.email}</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <VerifyUser
                isVerified={userData?.isVerified} 
                onVerificationSuccess={() => {
                  setUserData({ ...userData, isVerified: true });
                }} 
              />
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-red-500/5 hover:border-red-500/30 hover:text-red-500 transition-all text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard title="Total Perks" value={claims.length} icon={<LayoutGrid className="text-blue-400" />} />
        <StatCard title="Unlocked" value={approvedCount} icon={<ShieldCheck className="text-emerald-400" />} />
        <StatCard title="Estimated Savings" value={`$${claims.length * 150}`} icon={<CreditCard className="text-violet-400" />} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Your Benefits
          <span className="text-sm font-normal text-slate-500">({claims.length})</span>
        </h2>
      </div>
      
      <div className="grid gap-3">
        {claims.length > 0 ? claims.map((claim: any) => (
          <motion.div 
            key={claim._id}
            whileHover={{ scale: 1.005, backgroundColor: "rgba(30, 41, 59, 0.4)" }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/50 flex justify-between items-center group transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700">
                
                {claim.deal?.title?.charAt(0) || '?'}
              </div>
              <div>
                <h3 className="font-bold text-slate-100">{claim.deal?.title || 'Unknown Perk'}</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1">
                  {claim.deal?.partnerName || 'Unknown Partner'} 
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </div>
            
            <div className="text-right">
               <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                claim.status === 'approved' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {claim.status}
              </div>
              <p className="text-[10px] text-slate-600 font-medium block">
                {new Date(claim.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 mb-6">No perks claimed yet. Ready to scale?</p>
            <a href="/deals" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
              Explore Deals
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-10 animate-pulse">
      <div className="h-32 w-full bg-slate-900 border border-slate-800 rounded-3xl mb-12" />
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-900 border border-slate-800 rounded-2xl" />)}
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 w-full bg-slate-900/50 border border-slate-800 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}