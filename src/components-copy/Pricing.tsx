import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf, Tag, CheckCircle } from 'lucide-react';

const Pricing = () => {
  const [selectedColor, setSelectedColor] = useState('Beige');

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent rounded-full opacity-10 blur-3xl text-glow"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl text-glow"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/50 text-red-100 rounded-full mb-8"
        >
          <Tag size={18} className="text-red-400" />
          <span className="font-bold tracking-wider uppercase text-sm">Huge Mega Sale! ৪৬% ছাড়</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          অবিশ্বাস্য অফার! স্টকে থাকতে এখনই নিয়ে নিন
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          প্রিমিয়াম কোয়ালিটির এই ট্রাভেল ব্যাগটি এখন পাচ্ছেন অর্ধেকের চেয়েও কম দামে! এই অফারটি খুবই সীমিত সময়ের জন্য।
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 max-w-3xl mx-auto text-left flex flex-col md:flex-row gap-10 items-center">
          
          {/* Pricing Info */}
          <div className="flex-1 w-full relative">
            <h3 className="text-2xl font-bold text-white mb-2">Canvas Travel Bag - {selectedColor} color</h3>
            
            {/* Reviews */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <StarHalf size={18} fill="currentColor" />
              </div>
              <span className="text-gray-400 text-sm">(4 customer reviews)</span>
            </div>

            {/* Price Box */}
            <div className="flex flex-col mb-8">
              <span className="text-red-400 font-bold text-xl line-through decoration-red-500/50 decoration-2">
                ২,৭০০.০০৳
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 drop-shadow-sm">
                  ১,৪৫০.০০৳
                </span>
                <span className="text-lg text-gray-400 bg-white/10 px-2 rounded font-bold">46% OFF</span>
              </div>
            </div>

            {/* In Stock Badge */}
            <div className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 w-fit px-3 py-1.5 rounded flex items-center mb-6">
              <CheckCircle size={18} />
              <span>9722 in stock</span>
            </div>
          </div>

          {/* Color Selection & Action */}
          <div className="w-full md:w-auto flex flex-col items-start bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-sm font-bold text-gray-300 uppercase mb-4 tracking-wide">কালার বেছে নিন</h4>
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setSelectedColor('Beige')}
                className={`w-12 h-12 rounded-full bg-[#f5f5dc] border-4 transition-all ${selectedColor === 'Beige' ? 'border-accent scale-110' : 'border-transparent hover:scale-105'}`}
                title="Beige"
              ></button>
              <button 
                onClick={() => setSelectedColor('Black')}
                className={`w-12 h-12 rounded-full bg-black border-4 transition-all ${selectedColor === 'Black' ? 'border-accent scale-110' : 'border-gray-600 hover:scale-105'}`}
                title="Black"
              ></button>
            </div>
            
            <button 
              onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-accent hover:bg-accent-hover text-white flex-1 text-center font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-accent/30 transition-all text-lg transform hover:-translate-y-1"
            >
              এখনই অর্ডার করুন
            </button>
            <p className="text-xs text-center text-gray-500 mt-4 w-full">কোনো ডেলিভারি চার্জ সংযোজিত থাকলে তা অর্ডারের সাথে যুক্ত হবে</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
