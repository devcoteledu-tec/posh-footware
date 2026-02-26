import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreCollection = () => {
  const collections = [
    { id: 1, name: 'Urban Velocity', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070' },
    { id: 2, name: 'Midnight Stealth', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974' },
    { id: 3, name: 'Apex Performance', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070' },
    { id: 4, name: 'Heritage Classic', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest">Back to Home</span>
        </Link>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display tracking-tighter mb-16"
        >
          EXPLORE <br /> <span className="text-white/30 italic">COLLECTIONS</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Series 0{item.id}</p>
                  <h3 className="text-2xl font-display tracking-tight">{item.name}</h3>
                </div>
                <button className="p-4 bg-white text-black rounded-full hover:bg-emerald-500 hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCollection;
