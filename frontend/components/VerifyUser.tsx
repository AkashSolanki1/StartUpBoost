"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';

interface VerifyUserProps {
  isVerified: boolean;
  onVerificationSuccess: () => void;
}

export default function VerifyUser({ isVerified, onVerificationSuccess }: VerifyUserProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVerifyRequest = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
  
      const res = await fetch('http://localhost:5000/api/auth/verify-me', {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
        updatedUser.isVerified = true;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        onVerificationSuccess();
        setShowModal(false);
      }
    } catch (err) {
      console.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-bold">Verified Founder</span>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20"
      >
        <ShieldAlert className="w-5 h-5" />
        Verify Account
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-4">Complete Verification</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Unlock premium SaaS perks like AWS Credits and Stripe fee-free processing by verifying your startup status.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">1</div>
                  <p className="text-sm text-slate-300">Submit your startup details for review.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">2</div>
                  <p className="text-sm text-slate-300">Unlock "Locked" deals instantly after approval.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-800 font-semibold hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleVerifyRequest}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Verifying...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}