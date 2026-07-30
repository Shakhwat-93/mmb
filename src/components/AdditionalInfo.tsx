import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, CheckCircle2, ChevronDown, HelpCircle, Package, Users, FolderHeart } from 'lucide-react';

const AdditionalInfo = () => {
  // FAQ state: track which question index is open
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const itemsToKeep = [
    "বিভিন্ন মূল্যমানের টাকা", "বিল", "রিসিট", "ভাউচার", 
    "ব্যাংক স্লিপ", "ATM Card", "Business Card", 
    "ছোট নোটবুক", "গুরুত্বপূর্ণ কাগজপত্র"
  ];

  const targetAudience = [
    "মুদি দোকান", "ফার্মেসি", "কাপড়ের দোকান", "মোবাইল শপ", 
    "রেস্টুরেন্ট", "সুপার শপ", "ডেলিভারি ম্যান", "কুরিয়ার কালেক্টর", 
    "সেলস রিপ্রেজেন্টেটিভ", "হোলসেলার", "ছোট ও বড় ব্যবসায়ী"
  ];

  const faqs = [
    {
      q: "টাকা কি আলাদা আলাদা রাখা যাবে?",
      a: "জি, এই ব্যাগে ১০টি আলাদা চেম্বার রয়েছে, যার প্রতিটিতে বিভিন্ন মূল্যমানের টাকা বা নোট আলাদা করে গুছিয়ে রাখতে পারবেন।"
    },
    {
      q: "এটি কি প্রতিদিন ব্যবহার করা যাবে?",
      a: "অবশ্যই। Premium Polyester Nylon Fabric এবং Heavy Duty Zipper ব্যবহার করায় এটি অত্যন্ত মজবুত ও টেকসই, যা দৈনন্দিন ব্যবহারের জন্য সম্পূর্ণ উপযোগী।"
    },
    {
      q: "ব্যবসার জন্য উপযুক্ত?",
      a: "জি, দোকান, অফিস, কুরিয়ার, সেলস এবং দৈনিক ক্যাশ কালেকশনের জন্য এটি একটি আদর্শ ও অত্যন্ত প্রফেশনাল ব্যাগ।"
    },
    {
      q: "Cash on Delivery সুবিধা আছে কি?",
      a: "জি, সারা বাংলাদেশে হোম ডেলিভারি এবং ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা রয়েছে। প্রোডাক্ট হাতে পেয়ে দেখে চেক করে পেমেন্ট করতে পারবেন।"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* Row 1: What can be kept & Who should use */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card A: What can be kept */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <FolderHeart size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">এই ব্যাগে কী কী রাখা যাবে?</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {itemsToKeep.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-gray-50/50 hover:bg-gray-50 p-3 rounded-lg border border-gray-100 transition-colors">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span className="text-gray-700 text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card B: Target Audience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">কারা ব্যবহার করবেন?</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {targetAudience.map((audience, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 bg-blue-50/50 hover:bg-blue-50 text-blue-800 text-xs md:text-sm font-bold rounded-lg border border-blue-100/50 cursor-default transition-colors"
                  >
                    💼 {audience}
                  </span>
                ))}
              </div>
            </div>

            {/* Package details inside Card B */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-accent" />
                <span className="font-bold text-gray-900 text-sm">প্যাকেজে যা যা থাকছে:</span>
              </div>
              <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-black text-gray-700 shadow-sm">
                📦 ১ × Smart Money Management Bag
              </span>
            </div>
          </motion.div>

        </div>

        {/* Row 2: FAQ Accordion Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)</h3>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="space-y-3 mt-8">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-bold text-gray-800 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle size={18} className="text-accent shrink-0" />
                      <span className="text-sm md:text-base leading-snug">{faq.q}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-4 pt-1 text-sm md:text-base text-gray-600 border-t border-gray-100 bg-gray-50/30 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AdditionalInfo;
