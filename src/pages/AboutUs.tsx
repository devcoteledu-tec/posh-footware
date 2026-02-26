import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f0] text-black pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-black/50 hover:text-black transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest">Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-display tracking-tighter mb-12">
            OUR <span className="italic font-serif text-zinc-400">LEGACY</span>
          </h1>
          
          <div className="space-y-8 text-lg leading-relaxed text-zinc-700">
            <p>
              Founded in Kadampazhipuram, POSH represents the intersection of artisanal craftsmanship and futuristic engineering. We don't just make shoes; we craft experiences that bridge the gap between where you are and where you're going.
            </p>
            
            <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-200 my-12">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
                alt="Workshop" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            <p>
              Every pair of POSH sneakers undergoes a rigorous 120-step process, combining the finest sustainable materials with proprietary cushioning technology. Our mission is to provide the ultimate foundation for those who walk on the edge of innovation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 py-12 border-y border-zinc-200">
              <div>
                <h4 className="text-3xl font-display mb-2">2026</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-400">Founded</p>
              </div>
              <div>
                <h4 className="text-3xl font-display mb-2">120+</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-400">Steps / Pair</p>
              </div>
              <div>
                <h4 className="text-3xl font-display mb-2">∞</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-400">Innovation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
