import React from 'react';
import { motion } from 'framer-motion';
import { Frown, SmilePlus, XCircle, CheckCircle2 } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-16 bg-brand-50 border-y border-brand-100">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">কেন এই ব্যাগটি ব্যবহার করবেন?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">প্রতিদিন ব্যবসার শেষে টাকা, রিসিট, বিল, ভাউচার একসাথে মিশে যায়?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* VS Divider - Hidden on mobile */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-md font-bold text-gray-400 z-10 border border-gray-100">
            VS
          </div>

          {/* Problem Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-red-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <Frown size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">অন্যান্য সাধারণ ব্যাগ</h3>
            </div>
            <ul className="space-y-4">
              {[
                "১-২টি চেম্বার থাকায় সব টাকা একসাথে গুলিয়ে যায়",
                "সব টাকা একসাথে থাকায় গুনতে অনেক সময় লাগে",
                "এলোমেলো থাকার কারণে হিসাব মিলাতে সমস্যা হয়",
                "টাকা ও নোট ভাঁজ হয়ে কুঁচকে যায়",
                "গুরুত্বপূর্ণ রিসিট, বিল ও কাগজ হারিয়ে যাওয়ার ভয় থাকে",
                "কম টেকসই কাপড় ও সাধারণ জিপার যা দ্রুত নষ্ট হয়"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium text-sm md:text-base">
                  <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-green-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <SmilePlus size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Smart Money Management Bag</h3>
            </div>
            <ul className="space-y-4">
              {[
                "১০টি আলাদা চেম্বার — প্রতিটি নোট আলাদা করে রাখুন",
                "টাকা দ্রুত গুনে ফেলা যায় এবং সময় বাঁচে",
                "ক্যাশ ম্যানেজমেন্ট ও হিসাব মেলানো সহজ হয়",
                "টাকা ও কাগজপত্র সোজা এবং ফ্রেশ থাকে",
                "রিসিট, বিল, ভাউচার ও ব্যাংক স্লিপ সুন্দরভাবে গোছানো থাকে",
                "Premium Polyester Fabric এবং Heavy Duty Zipper যা দীর্ঘদিন চলে"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-800 font-semibold text-sm md:text-base">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        <div className="text-center mt-12">
          <p className="text-xl font-bold text-gray-900 leading-relaxed">
            Smart Money Management Bag আপনার প্রতিদিনের ক্যাশ ম্যানেজমেন্টকে করবে অনেক <span className="text-accent underline decoration-wavy decoration-orange-200">সহজ ও গোছানো</span>!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
