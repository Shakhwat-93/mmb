import React from 'react';
import { motion } from 'framer-motion';
import { Frown, SmilePlus, XCircle, CheckCircle2 } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-16 bg-brand-50 border-y border-brand-100">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">ভ্রমণের সাধারণ কিছু সমস্যা 😩</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">ভ্রমণ মানেই অনেক কিছু গুছানো, ভাঁজ পড়া কাপড়, ব্যাগের জায়গা ফুরিয়ে যাওয়া — আর ফ্লাইটে অতিরিক্ত লাগেজ ফি দেওয়ার দুঃস্বপ্ন।</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* VS Divider - Hidden on mobile, absolutely positioned on desktop */}
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
              <h3 className="text-xl font-bold text-gray-900">সাধারণ ব্যাগ</h3>
            </div>
            <ul className="space-y-4">
              {[
                "জিনিসপত্র খুঁজে বের করা কঠিন",
                "কাপড়ে সহজেই ভাঁজ পড়ে যায়",
                "ভারী এবং বহন করতে অস্বস্তিকর",
                "বৃষ্টিতে পানি ঢুকে নষ্ট হওয়ার ভয়",
                "এয়ারলাইনে অতিরিক্ত চার্জ দিতে হয়"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium">
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
              <h3 className="text-xl font-bold text-gray-900">Canvas Travel Bag</h3>
            </div>
            <ul className="space-y-4">
              {[
                "7 দিনের Trip-এর সবকিছু এক ব্যাগে।",
                "হঠাৎ বৃষ্টিতেও Laptop, ক্যামেরা ও জামা কাপড় 100% নিরাপদ থাকবে।",
                "Airline Approved — Extra Cabin Fee-এর ঝামেলা নেই।"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-800 font-semibold">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        <div className="text-center mt-12">
          <p className="text-xl font-bold text-gray-900">
            এই ঝামেলা থেকে মুক্তি দিতে আমরা নিয়ে এসেছি প্রিমিয়াম <span className="text-accent underline decoration-wavy decoration-orange-200">Canvas Travel Bag</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
