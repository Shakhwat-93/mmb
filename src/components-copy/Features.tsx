import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Weight, Droplets, Maximize, Lock, Plane } from 'lucide-react';

const featuresList = [
  {
    icon: <Layers size={24} />,
    title: "একাধিক স্মার্ট পকেট",
    desc: "অল্প জায়গায় অনেক কিছু গুছিয়ে নেওয়ার সুবিধা। ইউনিক ইনার লেআউট – কাপড় থাকবে একদম ভাঁজহীন।"
  },
  {
    icon: <Weight size={24} />,
    title: "মাত্র ১.৫ কেজি ওজন",
    desc: "বহন করতে একদম হালকা ও আরামদায়ক, যা আপনার ভ্রমণকে করবে আরও সহজ।"
  },
  {
    icon: <Droplets size={24} />,
    title: "টেকসই ওয়াটারপ্রুফ",
    desc: "TPU-900D Oxford Fabric, যা রেইন, ডাস্ট ও স্ক্র্যাচ-রেজিস্ট্যান্ট।"
  },
  {
    icon: <Maximize size={24} />,
    title: "বিশাল ৬০ লিটার স্পেস",
    desc: "জামাকাপড়, জুতো, গ্যাজেট, টয়লেটরি — সব এক জায়গাতেই এটে যাবে খুব সহজে।"
  },
  {
    icon: <Lock size={24} />,
    title: "শক্ত মেটাল জিপার",
    desc: "রিইনফোর্সড হ্যান্ডল ও মজবুত জিপার – দীর্ঘমেয়াদি ব্যবহারে ১০০% ভরসাযোগ্য।"
  },
  {
    icon: <Plane size={24} />,
    title: "এয়ারলাইন ক্যাবিন সাইজ",
    desc: "21″(L) × 9″(W) × 12″(H). Airline Approved ক্যারি-অন সাইজ, অতিরিক্ত লাগেজ ফি থেকে মুক্তি।"
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
            কেন Canvas Travel Bag সেরা?
          </motion.h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">এক ব্যাগেই সম্পূর্ণ ট্রিপের নিশ্চিন্ততা। চলুন দেখে নিই এর চমৎকার সব ফিচারগুলো।</p>
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
