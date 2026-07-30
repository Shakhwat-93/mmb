import React from 'react';
import { Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#cc0000] via-accent to-[#cc0000] text-white py-2 px-4 shadow-md w-full z-[60] relative overflow-hidden">
      {/* Decorative inner glow/shine */}
      <div className="absolute inset-0 bg-white/20 blur-xl translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
      
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:text-sm font-bold tracking-wide text-center">
        <span className="leading-tight">🚚 সারা বাংলাদেশে Cash on Delivery</span>
        <span className="hidden sm:inline text-white/50">|</span>
        <span className="leading-tight">🔄 ৭ দিনের রিপ্লেসমেন্ট</span>
        <span className="hidden sm:inline text-white/50">|</span>
        <span className="leading-tight">⭐ Trusted by 20,000+ Travelers</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
