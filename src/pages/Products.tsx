import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Filter, Loader2, Star, X, MapPin, Phone, User, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Product {
  id: string | number;
  model_name: string;
  price: string | number;
  category: string;
  image_url: string;
  description?: string;
  star_rating?: number;
  stock_quantity?: number;
  sizes_available?: string[];
}

const CheckoutModal = ({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    pincode: ''
  });

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Order from Posh!*%0A%0A` +
      `*Product Details:*%0A` +
      `- Name: ${product.model_name}%0A` +
      `- Price: ${product.price}%0A` +
      `- Category: ${product.category}%0A%0A` +
      `*Customer Details:*%0A` +
      `- Name: ${formData.name}%0A` +
      `- Mobile: ${formData.mobile}%0A` +
      `- Location: ${formData.location}%0A` +
      `- Pincode: ${formData.pincode}`;

    const whatsappUrl = `https://wa.me/917593038781?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display tracking-tight">Checkout</h2>
                <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-8 p-4 bg-zinc-50 rounded-2xl">
                <img src={product.image_url} alt={product.model_name} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h3 className="font-bold uppercase text-sm">{product.model_name}</h3>
                  <p className="text-xl font-display">{product.price}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="text"
                    placeholder="Location / Address"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    required
                    type="text"
                    placeholder="Pincode"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-zinc-800 transition-colors"
                >
                  <span>Confirm via WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockProducts: Product[] = [
    { id: 1, model_name: 'Posh One', price: '₹19,999', category: 'Performance', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070', star_rating: 4.8, stock_quantity: 12 },
    { id: 5, model_name: 'Midnight Pro', price: '₹24,999', category: 'Limited', image_url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925', star_rating: 4.7, stock_quantity: 3 },
    { id: 6, model_name: 'Vortex Max', price: '₹16,499', category: 'Lifestyle', image_url: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?q=80&w=1915', star_rating: 4.4, stock_quantity: 20 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
        }
      } catch (err: any) {
        console.error('Error fetching products:', err.message);
        setError(err.message);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-black/50 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest">Back</span>
          </Link>
          <button className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-display tracking-tighter mb-16"
        >
          ALL <span className="text-zinc-300 italic">PRODUCTS</span>
        </motion.h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Loading Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={product.image_url} 
                    alt={product.model_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                  {product.stock_quantity !== undefined && product.stock_quantity < 5 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      Only {product.stock_quantity} left
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-1">{product.model_name}</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-zinc-400 text-sm">{product.category}</p>
                      {product.star_rating && (
                        <div className="flex items-center text-zinc-900 text-xs font-bold">
                          <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                          {product.star_rating}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-display text-xl">
                    {typeof product.price === 'number' ? `₹${product.price}` : product.price}
                  </p>
                </div>
                {product.sizes_available && product.sizes_available.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.sizes_available.map(size => (
                      <span key={size} className="text-[10px] border border-zinc-200 px-2 py-1 rounded-md text-zinc-500">
                        {size}
                      </span>
                    ))}
                  </div>
                )}
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="w-full mt-6 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-black/10"
                >
                  SHOP NOW
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <CheckoutModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Products;
