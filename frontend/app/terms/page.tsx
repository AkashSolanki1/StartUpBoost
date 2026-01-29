import PolicyLayout from '@/components/PolicyLayout';

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Service">
      <section className="space-y-6 text-slate-400">
        <p>By using StartupBoost, you agree to the following terms:</p>
        
        <h3 className="text-xl font-bold text-white">1. Eligibility</h3>
        <p>Benefits are intended for startup founders and early-stage teams. Misrepresentation of startup status may result in account suspension.</p>
        
        <h3 className="text-xl font-bold text-white">2. Deal Usage</h3>
        <p>Exclusive deals provided through our partners are subject to the partner's own terms and conditions. We act as a platform to facilitate access, not as the service provider.</p>
        
        <h3 className="text-xl font-bold text-white">3. Verification</h3>
        <p>Certain "Locked" deals require manual verification. Our team reserves the right to approve or reject verification requests based on provided criteria.</p>
      </section>
    </PolicyLayout>
  );
}