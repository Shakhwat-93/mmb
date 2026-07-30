import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../../assets/pouch-model1.png';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white overflow-hidden py-10 md:py-16 lg:py-20">
      {/* Background Soft Gradients */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold tracking-wide"
            >
              <Sparkles size={16} className="text-accent" />
              <span>Premium Business Organizer</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 leading-tight"
            >
              আপনার ব্যবসার ক্যাশ এখন থাকবে ১০০% গোছানো! <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">
                Smart Money Management Bag 💰
              </span>
            </motion.h1>

            {/* Mobile-Only Image Display (Visible on mobile, hidden on desktop) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={scrollToForm}
              className="block lg:hidden w-full max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white cursor-pointer relative group"
            >
              <img 
                src={heroImg} 
                alt="Smart Money Management Bag" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </motion.div>

            {/* Description Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-600 max-w-xl font-medium leading-relaxed"
            >
              ১০টি আলাদা চেম্বারে আপনার টাকা, বিল, রিসিট ও গুরুত্বপূর্ণ কাগজপত্র গুছিয়ে রাখুন। ব্যবসার প্রতিদিনের হিসাব এখন হবে অনেক সহজ ও ঝামেলাহীন!
            </motion.p>

            {/* Bullets List */}
            <motion.ul 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left w-full text-gray-700 font-semibold"
            >
              <li className="flex items-center gap-2">
                <span className="text-accent text-lg">✓</span> 10 Separate Compartments
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent text-lg">✓</span> Premium Polyester Nylon Fabric
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent text-lg">✓</span> Heavy Duty Zipper
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent text-lg">✓</span> Lightweight & Easy to Carry
              </li>
              <li className="flex items-center gap-2 sm:col-span-2">
                <span className="text-accent text-lg">✓</span> Perfect for Daily Business Use
              </li>
            </motion.ul>

            {/* Pricing Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 bg-orange-50 border border-orange-200 rounded-2xl p-4 w-full max-w-md justify-center lg:justify-start"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs text-red-500 font-bold line-through">Regular Price: ৳৮০০</span>
                <span className="text-2xl font-black text-gray-900">Offer Price: ৳৫৮০ মাত্র</span>
              </div>
              <div className="bg-accent text-white px-3 py-1 rounded-lg text-xs font-black uppercase animate-bounce">
                46% OFF
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="w-full flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <button 
                onClick={scrollToForm}
                className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>এখনই অর্ডার করুন</span>
                <ArrowRight size={20} />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
                <ShieldCheck size={18} className="text-green-500" />
                <span>হাতে পেয়ে দেখে পেমেন্ট</span>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full"
            >
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                ✅ ক্যাশ অন ডেলিভারি
              </div>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                ✅ ঢাকায় ২৪-৪৮ ঘণ্টায় ডেলিভারি
              </div>
              <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-800 px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                ✅ সারাদেশে হোম ডেলিভারি!
              </div>
            </motion.div>

          </div>

          {/* Right Column: Desktop-Only Image Display */}
          <div className="hidden lg:block lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={scrollToForm}
              className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-8 border-white cursor-pointer group"
            >
              <img 
                src={heroImg} 
                alt="Smart Money Management Bag" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
