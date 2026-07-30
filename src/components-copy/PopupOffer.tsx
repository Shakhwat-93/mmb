import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import heroImg from '../../assets/hero-desktop.webp';

const PopupOffer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show pop-up after 10 seconds of page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClaim = () => {
    setIsOpen(false);
    document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Popup Modal */}
          <div className="fixed inset-0 z-[101] flex flex-col items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-1 border border-gray-100 pointer-events-auto"
            >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-gray-800 rounded-full p-1.5 backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative">
              {/* Image Header */}
              <div className="h-48 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-0 opacity-80" />
                <img src={heroImg} alt="Canvas Bag Offer" className="w-full h-full object-cover rounded-t-[22px]" />
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    <Gift size={14} /> Flash Sale
                  </div>
                  <h3 className="text-white font-extrabold text-2xl leading-none">৪৬% মেগা ডিসকাউন্ট!</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 text-center bg-white rounded-b-3xl">
                <p className="text-gray-600 font-medium mb-6">আমাদের প্রিমিয়াম Canvas Travel Bag-এ চলছে সীমিত সময়ের অফার। এখনই লুফে নিন!</p>
                
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="text-gray-400 font-bold text-xl line-through decoration-red-500/50 decoration-2">২,৭০০৳</span>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">১,৪৫০৳</span>
                </div>

                <button 
                  onClick={handleClaim}
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

export default PopupOffer;
