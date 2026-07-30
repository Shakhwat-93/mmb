import React from 'react';
import Header from './components/Header';
import { trackFacebookEvent } from './lib/facebookPixel';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import ProductGallery from './components/ProductGallery';
import AdditionalInfo from './components/AdditionalInfo';
import CheckoutForm from './components/CheckoutForm';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';
import AnnouncementBar from './components/AnnouncementBar';

function App() {
  const [isOrderSuccess, setIsOrderSuccess] = React.useState(false);

  React.useEffect(() => {
    // Push GA4 view_item event on page load
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: 580,
        items: [
          {
            item_name: "Smart Money Management Bag",
            price: 580,
            quantity: 1
          }
        ]
      }
    });

    // Track Facebook ViewContent (Browser Pixel & Conversions API)
    const viewEventId = `VIEW-${Math.floor(100000 + Math.random() * 900000)}`;
    trackFacebookEvent('ViewContent', viewEventId, {}, {
      content_name: 'Smart Money Management Bag',
      content_category: 'Business Bag',
      content_type: 'product',
      currency: 'BDT',
      value: 580
    });
  }, []);

  if (isOrderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4">
        <div className="bg-white p-10 rounded-xl shadow-sm text-center max-w-lg border border-gray-100 w-full">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
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
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProblemSolution />
        <Features />
        <ProductGallery />
        <AdditionalInfo />
        <CheckoutForm onSuccess={() => setIsOrderSuccess(true)} />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}

export default App;
