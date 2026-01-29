"use client";
import PolicyLayout from '@/components/PolicyLayout';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <PolicyLayout title="Contact Us">
      <p className="text-slate-400 mb-8">Have questions about a deal or your verification status? Reach out to our team.</p>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <textarea rows={4} placeholder="Your Message" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-blue-600/20"
        >
          Send Message
        </motion.button>
      </form>
    </PolicyLayout>
  );
}