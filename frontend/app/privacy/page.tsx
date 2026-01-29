import PolicyLayout from '@/components/PolicyLayout';

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <section className="space-y-6 text-slate-400">
        <p>Last updated: January 2026</p>
        <h3 className="text-xl font-bold text-white">1. Information We Collect</h3>
        <p>We collect information you provide directly to us when you create an account, such as your name, email address, and startup details for verification purposes.</p>
        
        <h3 className="text-xl font-bold text-white">2. How We Use Your Data</h3>
        <p>Your data is used to provide access to SaaS deals, track your claims, and verify your eligibility for "Locked" premium perks.</p>
        
        <h3 className="text-xl font-bold text-white">3. Data Security</h3>
        <p>We use industry-standard encryption to protect your data. Your passwords are never stored in plain text and are hashed using Bcrypt.</p>
      </section>
    </PolicyLayout>
  );
}