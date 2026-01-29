import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    
      <body className="bg-slate-950 text-white min-h-screen flex flex-col no-scrollbar">
        <Navbar />

        <main className="grow pb-24 md:pb-15">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}