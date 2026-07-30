import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Shield, Lock, FileText, Sparkles, Briefcase } from 'lucide-react';

const featuresList = [
  {
    icon: <Coins size={24} />,
    title: "১০টি আলাদা ক্যাশ চেম্বার",
    desc: "প্রতিটি মূল্যমানের টাকা আলাদা করে রাখার সুবিধা, যা টাকা গুছিয়ে রাখতে ও দ্রুত গুনতে সাহায্য করে।"
  },
  {
    icon: <Shield size={24} />,
    title: "Premium Polyester Nylon Fabric",
    desc: "দীর্ঘদিন ব্যবহারের উপযোগী অত্যন্ত শক্ত, টেকসই এবং ডাস্ট-প্রতিরোধী ফেব্রিক।"
  },
  {
    icon: <Lock size={24} />,
    title: "Heavy Duty Zipper",
    desc: "Smooth ও শক্তিশালী চেইন ও মেটাল জিপার, যা প্রতিদিনের ক্যাশ কালেকশনের জন্য অত্যন্ত উপযুক্ত।"
  },
  {
    icon: <FileText size={24} />,
    title: "Documents Organizer",
    desc: "রিসিট, বিল, ভাউচার, স্লিপ ও গুরুত্বপূর্ণ ব্যবসায়িক কাগজপত্র সুন্দরভাবে গুছিয়ে রাখার ডেডিকেটেড চেম্বার।"
  },
  {
    icon: <Sparkles size={24} />,
    title: "Compact & Lightweight",
    desc: "সহজে হাতে বা অন্য কোনো ব্যাগের ভেতরে বহন করার মতো কম ওজনের আরামদায়ক ডিজাইন।"
  },
  {
    icon: <Briefcase size={24} />,
    title: "Professional Look",
    desc: "দোকান, অফিস কিংবা ডেলিভারি কালেক্টরের ক্যাশ লেনদেনকে করে তোলে আরও বেশি স্মার্ট ও বিশ্বস্ত।"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            কেন Smart Money Management Bag সেরা?
          </motion.h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">প্রিমিয়াম ফিচার ও মজবুত ডিজাইনের এই ব্যাগটি আপনার প্রতিদিনের ব্যবসাকে করবে অনেক সহজ। চলুন দেখে নিই এর চমৎকার সব ফিচারগুলো।</p>
        </div>

        {/* Desktop View: Grid of Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-brand-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-transparent hover:border-brand-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white text-accent flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Compact List (Bullet Points) */}
        <div className="md:hidden space-y-6">
          {featuresList.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-4 p-2"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-accent flex items-center justify-center shrink-0 mt-1">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 20 })}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
