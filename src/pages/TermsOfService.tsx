import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-black pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-black/50 hover:text-black transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest">Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-zinc-100"
        >
          <h1 className="text-4xl font-display tracking-tight mb-8">Terms of Service</h1>
          <p className="text-zinc-400 text-sm mb-12 uppercase tracking-widest">Last Updated: February 2026</p>
          
          <div className="space-y-10 text-zinc-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">1. Acceptance of Terms</h2>
              <p>By accessing and using the POSH website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use this service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">2. Product Availability</h2>
              <p>All products are subject to availability, and we reserve the right to impose quantity limits on any order, to reject all or part of an order, and to discontinue products without notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">3. Shipping & Returns</h2>
              <p>We ship worldwide from our hub in Kadampazhipuram. Returns are accepted within 30 days of delivery for unworn items in original packaging. Custom "Edge" series items are final sale.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">4. Intellectual Property</h2>
              <p>The design, engineering, and branding of POSH footwear are protected by international copyright and patent laws. Unauthorized reproduction is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">5. Limitation of Liability</h2>
              <p>POSH shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our products or services.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
