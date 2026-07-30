import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Plus, Minus, Check, Sparkles, PhoneCall, ShoppingBag, 
  ArrowRight, PlaneTakeoff, ShieldCheck, Frown, SmilePlus, 
  XCircle, CheckCircle2, Layers, Weight, Droplets, Maximize, 
  Plane, Star, StarHalf, Tag, CheckCircle, X, Gift 
} from 'lucide-react';
import { supabase } from './lib/supabase';

// ==========================================
// 📸 IMAGES - Imported from root assets folder
// Change these path imports when you replace the images
// ==========================================
import heroNewImg from '../assets/hero-new.jpeg';
import heroDesktopImg from '../assets/hero-desktop.webp';
import blackImg from '../assets/black-color.webp';
import beigeImg from '../assets/beige-color.webp';
import blueImg from '../assets/blue-color.webp';

// ==========================================
// 🛠️ LANDING PAGE CONFIGURATION
// Customize your product text, price, and images here
// ==========================================
const CONFIG = {
  productId: "STB", // Used as prefix for Order IDs (e.g. STB-123456)
  productName: "Canvas Travel Bag",
  sourceTag: "stb-landing", // Stored in the orders table as "source"
  
  // Announcement Bar Configuration
  announcement: {
    delivery: "🚚 সারা বাংলাদেশে Cash on Delivery",
    replacement: "🔄 ৭ দিনের রিপ্লেসমেন্ট",
    trust: "⭐ Trusted by 20,000+ Travelers"
  },

  // Contact Phone Number
  supportPhone: "+8801942-212267",

  // Pricing
  price: 1450,
  originalPrice: 2700,

  // Hero Section
  hero: {
    badge: "Premium Travel Series",
    title: "৩ দিনের ট্রিপ হোক বা Weekend Tour —",
    coloredTitle: "একটি ব্যাগেই সব গুছিয়ে রাখুন ✈️",
    description: "Airline Cabin Size Approved, 60 লিটার Capacity, Waterproof Oxford Fabric, মাত্র ১.৫ কেজি!",
    image: heroNewImg, // Main banner image
  },

  // Problem vs Solution Comparison Section
  comparison: {
    title: "ভ্রমণের সাধারণ কিছু সমস্যা 😩",
    subtitle: "ভ্রমণ মানেই অনেক কিছু গুছানো, ভাঁজ পড়া কাপড়, ব্যাগের জায়গা ফুরিয়ে যাওয়া — আর ফ্লাইটে লাগেজ ফি দেওয়ার দুঃস্বপ্ন।",
    vsLabel: "VS",
    badProduct: {
      title: "সাধারণ ব্যাগ",
      items: [
        "জিনিসপত্র খুঁজে বের করা কঠিন",
        "কাপড়ে সহজেই ভাঁজ পড়ে যায়",
        "ভারী এবং বহন করতে অস্বস্তিকর",
        "বৃষ্টিতে পানি ঢুকে নষ্ট হওয়ার ভয়",
        "এয়ারলাইনে অতিরিক্ত চার্জ দিতে হয়"
      ]
    },
    goodProduct: {
      title: "Canvas Travel Bag",
      items: [
        "7 দিনের Trip-এর সবকিছু এক ব্যাগে।",
        "হঠাৎ বৃষ্টিতেও Laptop, ক্যামেরা ও জামা কাপড় 100% নিরাপদ থাকবে।",
        "Airline Approved — Extra Cabin Fee-এর ঝামেলা নেই।"
      ]
    },
    conclusion: "এই ঝামেলা থেকে মুক্তি দিতে আমরা নিয়ে এসেছি প্রিমিয়াম Canvas Travel Bag"
  },

  // Product Features List
  features: {
    title: "কেন Canvas Travel Bag সেরা?",
    description: "এক ব্যাগেই সম্পূর্ণ ট্রিপের নিশ্চিন্ততা। চলুন দেখে নিই এর চমৎকার সব ফিচারগুলো।",
    list: [
      {
        icon: "Layers",
        title: "একাধিক স্মার্ট পকেট",
        desc: "অল্প জায়গায় অনেক কিছু গুছিয়ে নেওয়ার সুবিধা। ইউনিক ইনার লেআউট – কাপড় থাকবে একদম ভাঁজহীন।"
      },
      {
        icon: "Weight",
        title: "মাত্র ১.৫ কেজি ওজন",
        desc: "বহন করতে একদম হালকা ও আরামদায়ক, যা আপনার ভ্রমণকে করবে আরও সহজ।"
      },
      {
        icon: "Droplets",
        title: "টেকসই ওয়াটারপ্রুফ",
        desc: "TPU-900D Oxford Fabric, যা রেইন, ডাস্ট ও স্ক্র্যাচ-রেজিস্ট্যান্ট।"
      },
      {
        icon: "Maximize",
        title: "বিশাল ৬০ লিটার স্পেস",
        desc: "জামাকাপড়, জুতো, গ্যাজেট, টয়লেটরি — সব এক জায়গাতেই এটে যাবে খুব সহজে।"
      },
      {
        icon: "Lock",
        title: "শক্ত মেটাল জিপার",
        desc: "রিইনফোর্সড হ্যান্ডল ও মজবুত জিপার – দীর্ঘমেয়াদি ব্যবহারে ১০০% ভরসাযোগ্য।"
      },
      {
        icon: "Plane",
        title: "এয়ারলাইন ক্যাবিন সাইজ",
        desc: "21″(L) × 9″(W) × 12″(H). Airline Approved ক্যারি-অন সাইজ, অতিরিক্ত লাগেজ ফি থেকে মুক্তি।"
      }
    ]
  },

  // Product Gallery Images (Grid)
  gallery: [
    blackImg,
    blueImg,
    beigeImg
  ],

  // Product Variants Selection in Checkout Form
  variants: [
    { id: 'black', name: 'Canvas Travel Bag - Black', colorCode: '#111827', image: blackImg, price: 1450, inStock: true },
    { id: 'blue', name: 'Canvas Travel Bag - Blue', colorCode: '#3b82f6', image: blueImg, price: 1450, inStock: false },
    { id: 'beige', name: 'Canvas Travel Bag - Beige', colorCode: '#e8dbce', image: beigeImg, price: 1450, inStock: true },
  ],

  // Shipping Configuration
  shipping: {
    insideDhakaCost: 60,
    outsideDhakaCost: 130,
    insideDhakaLabel: "ঢাকার ভিতরে ডেলিভারি চার্জ: 60.00৳",
    outsideDhakaLabel: "ঢাকার বাইরে ডেলিভারি চার্জ: 130.00৳",
    guaranteeText: "🛡️ ডেলিভারির সময় ট্রাভেল ব্যাগটি চেক করে নিবেন, ব্যবহারের সময় কোন সমস্যা হলে 7 দিনের মধ্যে রিপ্লেসমেন্ট করে দেওয়া হবে!"
  },

  // Footer Content
  footer: {
    tagline: "Premium quality bags for modern travelers.",
    copyright: "Canvas Bag BD. All rights reserved."
  }
};

// ==========================================
// 🧩 SECTION COMPONENTS
// ==========================================

// Helper function to render icons dynamically
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "Layers": return <Layers size={24} />;
    case "Weight": return <Weight size={24} />;
    case "Droplets": return <Droplets size={24} />;
    case "Maximize": return <Maximize size={24} />;
    case "Lock": return <Lock size={24} />;
    case "Plane": return <Plane size={24} />;
    default: return <Sparkles size={24} />;
  }
};

const AnnouncementBar = () => (
  <div className="bg-gradient-to-r from-[#cc0000] via-[#ff5c35] to-[#cc0000] text-white py-2 px-4 shadow-md w-full z-[60] relative overflow-hidden">
    <div className="absolute inset-0 bg-white/20 blur-xl translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:text-sm font-bold tracking-wide text-center">
      <span className="leading-tight">{CONFIG.announcement.delivery}</span>
      <span className="hidden sm:inline text-white/50">|</span>
      <span className="leading-tight">{CONFIG.announcement.replacement}</span>
      <span className="hidden sm:inline text-white/50">|</span>
      <span className="leading-tight">{CONFIG.announcement.trust}</span>
    </div>
  </div>
);

const Header = ({ onOrderClick }: { onOrderClick: () => void }) => (
  <motion.header 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
    className="hidden md:block sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
  >
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      {/* Logo Area */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold">
          {CONFIG.productId}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-xl tracking-tight text-gray-900">{CONFIG.productName}</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Premium Quality</span>
        </div>
      </div>

      {/* Support Details */}
      <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600">
        <PhoneCall size={16} className="text-green-600" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-green-600 font-bold uppercase tracking-wider">24/7 SUPPORT</span>
          <span className="text-gray-900 font-bold">{CONFIG.supportPhone}</span>
        </div>
      </div>

      {/* CTA button */}
      <button 
        onClick={onOrderClick}
        className="bg-[#ff5c35] hover:bg-[#ff4317] text-white px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <ShoppingBag size={16} />
        <span>অর্ডার করুন</span>
      </button>
    </div>
  </motion.header>
);

const Hero = ({ onOrderClick }: { onOrderClick: () => void }) => (
  <section className="relative bg-white overflow-hidden">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <img 
        src={CONFIG.hero.image} 
        alt={CONFIG.productName} 
        onClick={onOrderClick}
        className="w-full h-auto object-contain md:object-cover md:min-h-[500px] lg:min-h-screen cursor-pointer"
      />
    </motion.div>

    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center py-12">
      <div className="w-full max-w-3xl text-center flex flex-col items-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-700 text-sm font-semibold tracking-wide"
        >
          <PlaneTakeoff size={16} />
          <span>{CONFIG.hero.badge}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"
        >
          {CONFIG.hero.title} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c35] to-orange-500">
            {CONFIG.hero.coloredTitle}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base md:text-xl text-gray-600 max-w-2xl font-medium leading-relaxed"
        >
          {CONFIG.hero.description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button 
            onClick={onOrderClick}
            className="w-full sm:w-auto bg-[#ff5c35] hover:bg-[#ff4317] text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1"
          >
            <span>এখনই অর্ডার করুন</span>
            <ArrowRight size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <ShieldCheck size={18} className="text-green-500" />
            <span>100% Quality Guaranteed</span>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
        >
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2.5 rounded-full text-sm font-bold">
            ✅ ক্যাশ অন ডেলিভারি
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2.5 rounded-full text-sm font-bold">
            ✅ ঢাকায় ২৪-৪৮ ঘণ্টায় ডেলিভারি
          </div>
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-800 px-4 py-2.5 rounded-full text-sm font-bold">
            ✅ সারাদেশে ২৪-৭২ ঘণ্টায় ডেলিভারি
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section className="py-16 bg-slate-50 border-y border-slate-100">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{CONFIG.comparison.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{CONFIG.comparison.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-md font-bold text-gray-400 z-10 border border-gray-100">
          {CONFIG.comparison.vsLabel}
        </div>

        {/* Bad Card */}
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
            <h3 className="text-xl font-bold text-gray-900">{CONFIG.comparison.badProduct.title}</h3>
          </div>
          <ul className="space-y-4">
            {CONFIG.comparison.badProduct.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium">
                <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Good Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-green-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5c35]"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <SmilePlus size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{CONFIG.comparison.goodProduct.title}</h3>
          </div>
          <ul className="space-y-4">
            {CONFIG.comparison.goodProduct.items.map((item, idx) => (
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
          {CONFIG.comparison.conclusion}
        </p>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
        >
          {CONFIG.features.title}
        </motion.h2>
        <div className="w-24 h-1.5 bg-[#ff5c35] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">{CONFIG.features.description}</p>
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CONFIG.features.list.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-transparent hover:border-slate-200 group"
          >
            <div className="w-14 h-14 rounded-xl bg-white text-[#ff5c35] flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
              {renderIcon(feature.icon)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="md:hidden space-y-6">
        {CONFIG.features.list.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-2"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-50 text-[#ff5c35] flex items-center justify-center shrink-0 mt-1">
              {renderIcon(feature.icon)}
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

const ProductGallery = () => (
  <section className="py-16 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {CONFIG.gallery.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={img} 
              alt={`${CONFIG.productName} ${idx + 1}`} 
              className="w-full h-auto object-contain p-4 md:p-6" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [selectedColor, setSelectedColor] = useState('Beige');

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#ff5c35] rounded-full opacity-10 blur-3xl text-glow"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl text-glow"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/50 text-red-100 rounded-full mb-8"
        >
          <Tag size={18} className="text-red-400" />
          <span className="font-bold tracking-wider uppercase text-sm">Mega Sale! ৪৬% ছাড়</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          অবিশ্বাস্য অফার! স্টকে থাকতে এখনই নিয়ে নিন
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          প্রিমিয়াম কোয়ালিটির এই প্রোডাক্টটি এখন পাচ্ছেন অর্ধেকের চেয়েও কম দামে! এই অফারটি খুবই সীমিত সময়ের জন্য।
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 max-w-3xl mx-auto text-left flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 w-full relative">
            <h3 className="text-2xl font-bold text-white mb-2">{CONFIG.productName} - {selectedColor} color</h3>
            
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

            <div className="flex flex-col mb-8">
              <span className="text-red-400 font-bold text-xl line-through decoration-red-500/50 decoration-2">
                {CONFIG.originalPrice}.00৳
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c35] to-orange-400 drop-shadow-sm">
                  {CONFIG.price}.00৳
                </span>
                <span className="text-lg text-gray-400 bg-white/10 px-2 rounded font-bold">46% OFF</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 w-fit px-3 py-1.5 rounded flex items-center mb-6">
              <CheckCircle size={18} />
              <span>In stock / Deliverable</span>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-start bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-sm font-bold text-gray-300 uppercase mb-4 tracking-wide">কালার বেছে নিন</h4>
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setSelectedColor('Beige')}
                className={`w-12 h-12 rounded-full bg-[#e8dbce] border-4 transition-all ${selectedColor === 'Beige' ? 'border-[#ff5c35] scale-110' : 'border-transparent hover:scale-105'}`}
                title="Beige"
              ></button>
              <button 
                onClick={() => setSelectedColor('Black')}
                className={`w-12 h-12 rounded-full bg-black border-4 transition-all ${selectedColor === 'Black' ? 'border-[#ff5c35] scale-110' : 'border-gray-600 hover:scale-105'}`}
                title="Black"
              ></button>
            </div>
            
            <button 
              onClick={onOrderClick}
              className="w-full bg-[#ff5c35] hover:bg-[#ff4317] text-white flex-1 text-center font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-accent/30 transition-all text-lg transform hover:-translate-y-1"
            >
              এখনই অর্ডার করুন
            </button>
            <p className="text-xs text-center text-gray-500 mt-4 w-full">ডেলিভারি চার্জ পরবর্তীতে অর্ডারের সাথে যুক্ত হবে</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckoutForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [shippingCost, setShippingCost] = useState<number>(CONFIG.shipping.insideDhakaCost);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const customerIp = useRef<string | null>(null);
  const trafficSource = useRef<string>('Direct');
  const incompleteOrderIdRef = useRef<string | null>(null);

  // Cart configuration
  const [cart, setCart] = useState<Record<string, number>>({
    'black': 1
  });

  useEffect(() => {
    // Detect referrer traffic
    const detectTraffic = () => {
      const params = new URLSearchParams(window.location.search);
      const referrer = document.referrer.toLowerCase();
      
      const utmSource = params.get('utm_source')?.toLowerCase();
      if (utmSource) return utmSource.charAt(0).toUpperCase() + utmSource.slice(1);
      if (params.has('fbclid')) return 'Facebook';
      if (params.has('gclid')) return 'Google Ads';

      if (referrer) {
        if (referrer.includes('facebook') || referrer.includes('fb.com')) return 'Facebook';
        if (referrer.includes('google')) return 'Google';
      }
      return 'Direct';
    };

    trafficSource.current = detectTraffic();

    // Capture IP silently
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => { customerIp.current = data.ip || null; })
      .catch(() => {
        fetch('https://ipinfo.io/json')
          .then(res => res.json())
          .then(data => { customerIp.current = data.ip || null; })
          .catch(() => { customerIp.current = null; });
      });
  }, []);

  const handleToggleVariant = (id: string) => {
    const variant = CONFIG.variants.find(item => item.id === id);
    if (!variant?.inStock) return;

    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id]) delete newCart[id];
      else newCart[id] = 1;
      return newCart;
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const variant = CONFIG.variants.find(item => item.id === id);
    if (!variant?.inStock) return;

    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = currentQty + delta;
      if (newQty < 1) return prev;
      return { ...prev, [id]: newQty };
    });
  };

  const selectedItems = CONFIG.variants.filter(v => v.inStock && cart[v.id]);
  const productSubtotal = selectedItems.reduce((sum, item) => sum + (item.price * cart[item.id]), 0);
  const total = productSubtotal + shippingCost;

  // Incomplete order tracking function
  const saveIncompleteOrder = async (currentName: string, currentPhone: string, currentAddress: string) => {
    if (!currentPhone && !currentName) return;

    const totalItems = selectedItems.reduce((sum, item) => sum + cart[item.id], 0);
    const orderedItemsJson = selectedItems.map(item => ({
      name: item.name,
      quantity: cart[item.id],
      price: item.price
    }));

    try {
      if (!incompleteOrderIdRef.current) {
        const newOrderId = `${CONFIG.productId}-${Math.floor(100000 + Math.random() * 900000)}`;
        const { error } = await supabase
          .from('orders')
          .insert([
            {
              id: newOrderId,
              customer_name: currentName || null,
              phone: currentPhone || null,
              address: currentAddress || null,
              product_name: CONFIG.productName,
              ordered_items: orderedItemsJson,
              amount: total,
              items: totalItems,
              shipping_zone: shippingCost === CONFIG.shipping.outsideDhakaCost ? 'Outside dhaka' : 'Inside dhaka',
              source: CONFIG.sourceTag,
              status: 'Incomplete',
              ip_address: customerIp.current || null,
              traffic_source: trafficSource.current
            }
          ]);

        if (error) {
          console.error("Error inserting incomplete order:", error);
        } else {
          incompleteOrderIdRef.current = newOrderId;
        }
      } else {
        const { error } = await supabase
          .from('orders')
          .update({
            customer_name: currentName || null,
            phone: currentPhone || null,
            address: currentAddress || null,
            ordered_items: orderedItemsJson,
            amount: total,
            items: totalItems,
            shipping_zone: shippingCost === CONFIG.shipping.outsideDhakaCost ? 'Outside dhaka' : 'Inside dhaka',
            ip_address: customerIp.current || null,
            traffic_source: trafficSource.current
          })
          .eq('id', incompleteOrderIdRef.current);

        if (error) {
          console.error("Error updating incomplete order:", error);
        }
      }
    } catch (err) {
      console.error("Failed to save incomplete order:", err);
    }
  };

  // Debounced auto-save effect
  useEffect(() => {
    if (!name && !phone && !address) return;

    const timer = setTimeout(() => {
      saveIncompleteOrder(name, phone, address);
    }, 2000);

    return () => clearTimeout(timer);
  }, [name, phone, address, cart, shippingCost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please select at least one product.");
      return;
    }
    
    // Validate BD Phone Number
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(phone)) {
      alert("দয়া করে সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)।");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const totalItems = selectedItems.reduce((sum, item) => sum + cart[item.id], 0);
      const orderedItemsJson = selectedItems.map(item => ({
        name: item.name,
        quantity: cart[item.id],
        price: item.price
      }));

      let finalOrderId = incompleteOrderIdRef.current;
      let error;

      if (finalOrderId) {
        // Update the Incomplete order's status to 'New'
        const { error: updateError } = await supabase
          .from('orders')
          .update({
            customer_name: name,
            phone: phone,
            address: address,
            ordered_items: orderedItemsJson,
            amount: total,
            items: totalItems,
            shipping_zone: shippingCost === CONFIG.shipping.outsideDhakaCost ? 'Outside dhaka' : 'Inside dhaka',
            status: 'New',
            ip_address: customerIp.current || null,
            traffic_source: trafficSource.current,
            updated_at: new Date().toISOString()
          })
          .eq('id', finalOrderId);

        error = updateError;
      } else {
        finalOrderId = `${CONFIG.productId}-${Math.floor(100000 + Math.random() * 900000)}`;
        const { error: insertError } = await supabase.from('orders').insert([
          {
            id: finalOrderId,
            customer_name: name,
            phone: phone,
            address: address,
            product_name: CONFIG.productName,
            ordered_items: orderedItemsJson,
            amount: total,
            items: totalItems,
            shipping_zone: shippingCost === CONFIG.shipping.outsideDhakaCost ? 'Outside dhaka' : 'Inside dhaka',
            source: CONFIG.sourceTag,
            status: 'New',
            ip_address: customerIp.current || null,
            traffic_source: trafficSource.current
          }
        ]);

        error = insertError;
      }

      if (error) throw error;
      
      // GA4 Purchase Tracking
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: finalOrderId,
          value: total,
          currency: "BDT",
          items: orderedItemsJson.map(item => ({
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        },
        customer_name: name,
        customer_phone: phone,
        customer_address: address
      });

      // Clear incomplete tracker ref
      incompleteOrderIdRef.current = null;
      localStorage.setItem('last_order_time', Date.now().toString());
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("অর্ডার সাবমিট করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন বা আমাদের কল করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkout-form" className="py-16 bg-white border-t border-gray-100 relative">
      <div className="max-w-5xl mx-auto px-4">
        <form onSubmit={handleSubmit}>
          
          {/* Products List Selection */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Products</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {CONFIG.variants.map(variant => {
                const isSelected = !!cart[variant.id];
                const qty = cart[variant.id] || 0;
                const isOutOfStock = !variant.inStock;

                return (
                  <div 
                    key={variant.id}
                    className={`flex items-center p-4 rounded-xl border transition-all ${
                      isOutOfStock
                        ? 'border-gray-200 bg-gray-50 opacity-75'
                        : isSelected
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div 
                      onClick={() => handleToggleVariant(variant.id)}
                      className={`mr-4 ${isOutOfStock ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center border ${
                        isOutOfStock
                          ? 'border-gray-300 bg-gray-100'
                          : isSelected
                            ? 'bg-blue-800 border-blue-800 text-white'
                            : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check size={16} strokeWidth={3} />}
                      </div>
                    </div>

                    <div className="w-16 h-16 rounded-md shadow-sm mr-4 flex-shrink-0 border border-gray-100 overflow-hidden bg-gray-50 relative">
                      <img src={variant.image} alt={variant.name} className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`} />
                      {isOutOfStock && <div className="absolute inset-0 bg-white/35" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className={`text-sm font-medium ${isOutOfStock ? 'text-gray-500' : 'text-gray-800'}`}>{variant.name}</h4>
                        {isOutOfStock && (
                          <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600 border border-red-100">
                            Stock out
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                          <button 
                            type="button"
                            onClick={() => handleUpdateQuantity(variant.id, -1)}
                            disabled={!isSelected || isOutOfStock}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={`w-8 text-center text-sm font-medium ${isOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>{isSelected ? qty : 1}</span>
                          <button 
                            type="button"
                            onClick={() => handleUpdateQuantity(variant.id, 1)}
                            disabled={!isSelected || isOutOfStock}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-gray-900">{variant.price}৳</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            
            {/* Billing Fields */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Billing & Shipping</h3>

              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-800">
                    আপনার নাম লিখুন <span className="text-red-600">*</span>
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => saveIncompleteOrder(name, phone, address)}
                    placeholder="e.g. Hasan Mahmud" 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-800">
                    আপনার ঠিকানা এলাকা, থানা, জেলা লিখুন <span className="text-red-600">*</span>
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => saveIncompleteOrder(name, phone, address)}
                    placeholder="e.g. House 12, Road 4, Dhanmondi, Dhaka" 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-800">
                    মোবাইল নাম্বার <span className="text-red-600">*</span>
                  </label>
                  <input 
                    required 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => saveIncompleteOrder(name, phone, address)}
                    placeholder="01XXXXXXXXX" 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors" 
                  />
                </div>
              </div>
            </div>

            {/* Order Review & Shipping selection */}
            <div className="w-full md:w-[45%]">
               <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Your order</h3>

               <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                 <p className="text-sm font-semibold text-green-800 leading-relaxed">
                   {CONFIG.shipping.guaranteeText}
                 </p>
               </div>

               <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                 <span>Product</span>
                 <span>Subtotal</span>
               </div>

               <div className="mb-6 pb-6 border-b border-gray-100 space-y-4">
                 {selectedItems.length === 0 ? (
                   <p className="text-sm text-red-500 italic">No products selected.</p>
                 ) : (
                   selectedItems.map(item => (
                     <div key={item.id} className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded shadow-sm flex-shrink-0 border border-gray-100 overflow-hidden bg-gray-50">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex flex-col text-sm text-gray-600">
                           <span>{item.name}</span>
                           <span className="font-bold">× {cart[item.id]}</span>
                         </div>
                       </div>
                       <span className="font-bold text-gray-900">{item.price * cart[item.id]}৳</span>
                     </div>
                   ))
                 )}
               </div>

               <div className="flex justify-between items-center mb-4 text-sm">
                 <span className="font-bold text-gray-800">Subtotal</span>
                 <span className="font-bold text-gray-900">{productSubtotal}৳</span>
               </div>

               <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-gray-800">{CONFIG.shipping.outsideDhakaLabel}</span>
                   <input 
                     type="radio" 
                     name="shipping" 
                     value={CONFIG.shipping.outsideDhakaCost}
                     checked={shippingCost === CONFIG.shipping.outsideDhakaCost}
                     onChange={() => setShippingCost(CONFIG.shipping.outsideDhakaCost)}
                     className="w-4 h-4 ml-2 text-accent border-gray-300 focus:ring-accent accent-purple-600 cursor-pointer"
                   />
                 </label>
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-gray-800">{CONFIG.shipping.insideDhakaLabel}</span>
                   <input 
                     type="radio" 
                     name="shipping" 
                     value={CONFIG.shipping.insideDhakaCost}
                     checked={shippingCost === CONFIG.shipping.insideDhakaCost}
                     onChange={() => setShippingCost(CONFIG.shipping.insideDhakaCost)}
                     className="w-4 h-4 text-accent border-gray-300 focus:ring-accent accent-purple-600 cursor-pointer"
                   />
                 </label>
               </div>

               <div className="flex justify-between items-center mb-8">
                 <span className="font-extrabold text-lg text-gray-900">Total</span>
                 <span className="font-black text-2xl text-red-600">{total}৳</span>
               </div>

               <button 
                 type="submit" 
                 disabled={selectedItems.length === 0 || isSubmitting}
                 className="w-full bg-[#cc0000] hover:bg-[#a30000] disabled:bg-gray-400 text-white font-bold py-4 rounded-md shadow transition-colors flex justify-center items-center gap-2 mb-4"
               >
                 <Lock size={18} />
                 <span className="text-lg">{isSubmitting ? 'প্রসেসিং...' : 'অর্ডার কনফার্ম করুন'}</span>
               </button>

               <div className="text-center text-xs text-gray-500 font-medium">
                 অর্ডার করতে কোনো সমস্যা হলে কল করুন: {CONFIG.supportPhone}
               </div>

            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300 py-10 border-t border-slate-900">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-slate-950 rounded-lg flex items-center justify-center font-black">
          {CONFIG.productId}
        </div>
        <span className="font-bold text-xl tracking-tight text-white">{CONFIG.productName}</span>
      </div>

      <div className="text-center md:text-left text-sm">
        <p>© {new Date().getFullYear()} {CONFIG.footer.copyright}</p>
        <p className="mt-1 text-slate-500">{CONFIG.footer.tagline}</p>
      </div>

      <div className="flex gap-4 text-sm font-medium">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
      </div>
    </div>
  </footer>
);

const FloatingCallButton = () => (
  <motion.a
    href={`tel:${CONFIG.supportPhone.replace(/[^0-9+]/g, '')}`}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full text-white shadow-lg border-2 border-white/50 group"
    style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <PhoneCall size={24} className="fill-current group-hover:rotate-12 transition-transform" />
    </motion.div>
  </motion.a>
);

const PopupOffer = ({ onClaim }: { onClaim: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setIsOpen(true); }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex flex-col items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-1 border border-gray-100 pointer-events-auto"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-gray-800 rounded-full p-1.5 backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative">
                <div className="h-48 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-0 opacity-80" />
                  <img src={heroDesktopImg} alt={CONFIG.productName} className="w-full h-full object-cover rounded-t-[22px]" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                      <Gift size={14} /> Flash Sale
                    </div>
                    <h3 className="text-white font-extrabold text-2xl leading-none">৪৬% মেগা ডিসকাউন্ট!</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 text-center bg-white rounded-b-3xl">
                  <p className="text-gray-600 font-medium mb-6">আমাদের প্রিমিয়াম {CONFIG.productName}-এ চলছে সীমিত সময়ের অফার। এখনই লুফে নিন!</p>
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="text-gray-400 font-bold text-xl line-through decoration-red-500/50 decoration-2">{CONFIG.originalPrice}৳</span>
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c35] to-orange-500">{CONFIG.price}৳</span>
                  </div>

                  <button 
                    onClick={() => { setIsOpen(false); onClaim(); }}
                    className="w-full bg-[#cc0000] hover:bg-[#a30000] text-white font-bold py-4 rounded-xl shadow-[0_8px_30px_rgba(204,0,0,0.3)] transition-all transform hover:-translate-y-1 text-lg mb-2"
                  >
                    অফারটি গ্রহণ করুন
                  </button>
                  <p className="text-xs text-red-500 font-semibold">* স্টক শেষ হওয়ার আগেই অর্ডার করুন</p>
                </div>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 🚀 MAIN LANDING COMPONENT (Default Export)
// ==========================================
export default function LandingTemplate() {
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const scrollToCheckout = () => {
    document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // GA4 view_item trigger
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: CONFIG.price,
        items: [
          {
            item_name: CONFIG.productName,
            price: CONFIG.price,
            quantity: 1
          }
        ]
      }
    });
  }, []);

  if (isOrderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4">
        <div className="bg-white p-10 rounded-xl shadow-sm text-center max-w-lg border border-gray-100 w-full">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">অর্ডার সফল হয়েছে!</h2>
          <p className="text-gray-600 text-lg mb-8">খুব দ্রুত আমাদের প্রতিনিধি আপনাকে কল করে অর্ডারটি কনফার্ম করবে। ধন্যবাদ!</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors"
          >
            হোমপেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOrderClick={scrollToCheckout} />
      <main className="flex-grow">
        <Hero onOrderClick={scrollToCheckout} />
        <ProblemSolution />
        <Features />
        <ProductGallery />
        <Pricing onOrderClick={scrollToCheckout} />
        <CheckoutForm onSuccess={() => setIsOrderSuccess(true)} />
      </main>
      <Footer />
      <FloatingCallButton />
      <PopupOffer onClaim={scrollToCheckout} />
    </div>
  );
}