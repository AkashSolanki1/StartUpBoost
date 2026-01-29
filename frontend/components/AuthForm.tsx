"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = type === 'login' ? '/login' : '/register';
      
    
      const res = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      router.push('/dashboard');
    } catch (err: any) {
      
      const errorMessage = err.message === "Failed to fetch" 
        ? "Cannot connect to server. Is the backend running?" 
        : err.message;
        
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        {type === 'login' ? 'Welcome Back' : 'Join the Club'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input 
              type="text"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm text-slate-400 mb-1">Email Address</label>
          <input 
            type="email"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Password</label>
          <input 
            type="password"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-6 shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Create Account'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-slate-400 text-sm">
        {type === 'login' ? "Don't have an account?" : "Already have an account?"}
        <button 
          type="button"
          onClick={() => router.push(type === 'login' ? '/auth/register' : '/auth/login')}
          className="text-blue-400 ml-1 hover:underline cursor-pointer"
        >
          {type === 'login' ? 'Register here' : 'Login here'}
        </button>
      </p>
    </motion.div>
  );
}