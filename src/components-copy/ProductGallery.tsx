import React from 'react';
import { motion } from 'framer-motion';
import blackImg from '../../assets/black-color.webp';
import blueImg from '../../assets/blue-color.webp';
import beigeImg from '../../assets/beige-color.webp';

const images = [blackImg, blueImg, beigeImg];

const ProductGallery = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, idx) => (
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
                alt={`Canvas Bag ${idx + 1}`} 
                className="w-full h-auto object-contain p-4 md:p-6" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
