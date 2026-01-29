"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  return (
    <nav className="p-6 flex justify-between items-center border-b border-white/10 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
      <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        <a href="/">StartupBoost</a>
      </h1>
      
      <div className="space-x-6 text-sm font-medium flex items-center">
        <a href="/deals" className="hover:text-blue-400 transition font-bold text-slate-300" >Deals</a>
        <a href="/dashboard" className="hover:text-blue-400 transition font-bold text-slate-300">Dashboard</a>
        
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-xl transition-all font-bold border border-slate-700"
          >
            Logout
          </button>
        ) : (
          <a 
            href="/auth/login" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl transition-all font-bold shadow-lg shadow-blue-600/20"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}