import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Filter, Loader2, Star } from 'lucide-react';
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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mockProducts: Product[] = [
    { id: 1, model_name: 'Posh One', price: '$240', category: 'Performance', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070', star_rating: 4.8, stock_quantity: 12 },
    { id: 2, model_name: 'Stealth Runner', price: '$180', category: 'Lifestyle', image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974', star_rating: 4.5, stock_quantity: 8 },
    { id: 3, model_name: 'Urban Edge', price: '$210', category: 'Urban', image_url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070', star_rating: 4.2, stock_quantity: 15 },
    { id: 4, model_name: 'Cloud Walker', price: '$260', category: 'Performance', image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974', star_rating: 4.9, stock_quantity: 5 },
    { id: 5, model_name: 'Midnight Pro', price: '$290', category: 'Limited', image_url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925', star_rating: 4.7, stock_quantity: 3 },
    { id: 6, model_name: 'Vortex Max', price: '$195', category: 'Lifestyle', image_url: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?q=80&w=1915', star_rating: 4.4, stock_quantity: 20 },
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
                    {typeof product.price === 'number' ? `$${product.price}` : product.price}
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
