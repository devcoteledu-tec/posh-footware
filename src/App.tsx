import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, ArrowRight, Instagram, Twitter, Facebook, ChevronRight, Loader2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';

// Import Pages
import ExploreCollection from './pages/ExploreCollection';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import TermsOfService from './pages/TermsOfService';

interface Shoe {
  id: string | number;
  model_name: string;
  price: string | number;
  image_url: string;
  color?: string;
  description: string;
}

const DEFAULT_SHOES: Shoe[] = [
  {
    id: 1,
    model_name: "VELOCITY ELITE",
    price: "$240",
    image_url: "https://www.pngplay.com/wp-content/uploads/6/Adidas-Shoes-Sneakers-Transparent-PNG.png",
    color: "from-blue-500 to-purple-600",
    description: "Engineered for pure speed and ultimate comfort."
  },
  {
    id: 2,
    model_name: "STREET PULSE",
    price: "$180",
    image_url: "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
    color: "from-orange-500 to-red-600",
    description: "The perfect blend of urban style and athletic performance."
  },
  {
    id: 3,
    model_name: "FUTURE RUNNER",
    price: "$320",
    image_url: "https://file.aiquickdraw.com/imgcompressed/img/compressed_cc2b6c7d0c91c142817535bc16c459cd.webp",
    color: "from-emerald-400 to-cyan-500",
    description: "Next-generation technology for the modern athlete."
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/explore' },
    { name: 'Shop', path: '/products' },
    { name: 'Philosophy', path: '/about' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference border-b border-white/5 will-change-transform"
      >
        <Link to="/" className="text-2xl font-display tracking-tighter">POSH</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-12 text-xs font-semibold tracking-widest uppercase">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:opacity-50 transition-opacity ${location.pathname === link.path ? 'text-posh-gold' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/products">
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
          </Link>
          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <Menu className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => setIsOpen(true)} className="hidden md:block">
            <Menu className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile/Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
            >
              <span>Close</span>
              <Menu className="w-5 h-5 rotate-45" />
            </button>

            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className="text-4xl sm:text-6xl font-display tracking-tighter hover:italic hover:text-posh-gold transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-12 flex space-x-8 opacity-40">
              <Instagram className="w-5 h-5" />
              <Twitter className="w-5 h-5" />
              <Facebook className="w-5 h-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ featuredShoe }: { featuredShoe: Shoe }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const ShoeImage = ({ className = "" }: { className?: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -30, filter: 'blur(15px)' }}
      animate={{ opacity: 1, scale: 1, rotate: -10, filter: 'blur(0px)' }}
      transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ rotate, scale }}
      className={`relative will-change-transform ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[120px] rounded-full" />
      <motion.img 
        animate={{ 
          y: [0, -30, 0],
          rotate: [-12, -6, -12]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        src="https://freepngimg.com/save/27428-nike-shoes-transparent-background/800x587" 
        alt="Featured Posh Shoe" 
        className="w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] relative z-10"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );

  return (
    <section className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0">
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none will-change-transform"
      >
        <h1 className="text-[35vw] lg:text-[25vw] font-display leading-none tracking-tighter opacity-10 whitespace-nowrap">
          POSH POSH POSH
        </h1>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center pt-20 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-center lg:text-left will-change-transform"
        >
          <h2 
            className="text-8xl sm:text-8xl md:text-9xl lg:text-[11vw] font-display leading-[0.8] tracking-tighter mb-8 bg-clip-text text-transparent bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549298916-f52d724204b4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNuZWFrZXJzfGVufDB8fDB8fHww")' }}
          >
            WALK ON <br />
            THE EDGE
          </h2>

          {/* Mobile Shoe Image - Visible only on small screens */}
          <ShoeImage className="lg:hidden my-8 max-w-[280px] sm:max-w-sm mx-auto" />

          <p className="max-w-md mx-auto lg:mx-0 text-white/60 text-base sm:text-lg mb-10 font-light leading-relaxed">
            Experience the pinnacle of footwear engineering. Designed for those who demand excellence in every step.
          </p>
          <Link to="/explore">
            <motion.button
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden flex items-center space-x-4 bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 mx-auto lg:mx-0"
            >
              {/* Charging Progress Bar Effect */}
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-green-500 z-0"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 10, 
                  ease: "linear" 
                }}
              />
              
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Desktop Shoe Image - Hidden on small screens */}
        <ShoeImage className="hidden lg:block mt-12 lg:mt-0" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Scroll</span>
      </motion.div>
    </section>
  );
};

interface ProductCardProps {
  shoe: Shoe;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <div ref={ref} className="min-h-screen flex items-center py-12 lg:py-24">
      <div className={`container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
        <div className={`text-center lg:text-left ${index % 2 !== 0 ? 'lg:order-2' : ''} will-change-transform`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-posh-gold text-sm mb-4 block">0{index + 1}</span>
            <h3 className="text-5xl sm:text-6xl md:text-8xl font-display tracking-tighter mb-6">{shoe.model_name}</h3>
            <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-md mx-auto lg:mx-0">{shoe.description}</p>
            <div className="text-2xl sm:text-3xl font-display mb-10">
              {typeof shoe.price === 'number' ? `$${shoe.price}` : shoe.price}
            </div>
            <button className="border border-white/20 hover:border-white px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase transition-colors">
              View Details
            </button>
          </motion.div>
        </div>

        <div className={`relative flex justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''} will-change-transform`}>
          <motion.div 
            style={{ y }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden will-change-transform"
          >
            <h4 className="text-[30vw] lg:text-[20vw] font-display text-white/[0.03] whitespace-nowrap">
              {shoe.model_name} {shoe.model_name}
            </h4>
          </motion.div>
          <motion.div 
            style={{ y }}
            className={`absolute inset-0 bg-gradient-to-br ${shoe.color || 'from-zinc-500 to-zinc-800'} opacity-10 blur-[60px] lg:blur-[100px] rounded-full will-change-opacity`} 
          />
          <motion.img
            style={{ rotate: imageRotate }}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={shoe.image_url}
            alt={shoe.model_name}
            className="w-full max-w-sm sm:max-w-md lg:max-w-xl relative z-10 drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="py-24 border-t border-white/10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-4xl font-display tracking-tighter mb-8">POSH</h4>
          <p className="text-white/40 max-w-xs mb-8">
            Redefining the boundaries of athletic footwear through innovation and artistic expression.
          </p>
          <div className="flex space-x-6">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-posh-gold transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-posh-gold transition-colors" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-posh-gold transition-colors" />
          </div>
        </div>
        <div>
          <h5 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-6">Navigation</h5>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/products" className="hover:text-white transition-colors">Shop All</Link></li>
            <li><Link to="/explore" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Philosophy</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-6">Support</h5>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:row justify-between items-center pt-12 border-t border-white/5 text-[10px] tracking-widest uppercase text-white/30">
        <p>© 2026 POSH FOOTWEAR. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, svg')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.6 }}
    />
  );
};

const Preloader = ({ finishLoading }: { finishLoading: () => void }) => {
  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-posh-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display tracking-tighter mb-4"
        >
          POSH
        </motion.div>
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden mx-auto">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            onAnimationComplete={finishLoading}
            className="absolute inset-0 bg-posh-gold"
          />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] tracking-[0.4em] uppercase mt-4"
        >
          Elevating Footwear
        </motion.p>
      </div>
    </motion.div>
  );
};

const FutureSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scale the circle from 0 to a size that covers the section
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0, 25]);
  const circleOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  
  // Mask radius for the overlay, synchronized with circle expansion
  // The circle starts at 100px, so scale * 50px is the radius
  const maskRadius = useTransform(scrollYProgress, [0.3, 0.7], ["0px", "1500px"]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-24 lg:py-48 text-black overflow-hidden bg-posh-black will-change-transform"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJ1bm5pbmclMjBzaG9lfGVufDB8fDB8fHww"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        {/* Shadow Overlay with dynamic hole */}
        <motion.div 
          style={{ 
            maskImage: useTransform(maskRadius, (r) => `radial-gradient(circle at center, transparent ${r}, black ${r})`),
            WebkitMaskImage: useTransform(maskRadius, (r) => `radial-gradient(circle at center, transparent ${r}, black ${r})`),
          }}
          className="absolute inset-0 bg-posh-black/80" 
        />
      </div>

      {/* Full Circle Animation */}
      <motion.div 
        style={{ 
          scale,
          opacity: circleOpacity,
          backgroundColor: 'rgba(158, 162, 162, 0.1)', // Even more transparent to let image shine
          backdropFilter: 'blur(0px)', // Reduced blur for better visibility
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full origin-center z-1 will-change-transform border border-white/5"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 80, filter: 'blur(15px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[12vw] font-display tracking-tighter leading-[0.8] uppercase text-center lg:text-left mb-12 lg:mb-0 mix-blend-difference text-white will-change-transform"
          >
            THE <br /> FUTURE <br /> IS HERE
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs text-sm uppercase tracking-widest font-bold text-center lg:text-left mix-blend-difference text-black will-change-transform"
          >
            <p className="mb-6 opacity-50">Pushing the limits of what's possible in footwear design.</p>
            <Link to="/about" className="flex items-center justify-center lg:justify-start space-x-2 group">
              <span>Read Our Story</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = ({ shoes }: { shoes: Shoe[] }) => {
  return (
    <main>
      <Hero featuredShoe={shoes[0]} />
      <FutureSection />

      <div className="bg-posh-black">
        {shoes.map((shoe, index) => (
          <ProductCard key={shoe.id} shoe={shoe} index={index} />
        ))}
      </div>

      {/* Handcrafted Section */}
      <section className="py-20 bg-orange-500">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center"
          >
            <img 
              src="https://t3.ftcdn.net/jpg/02/72/68/26/360_F_272682633_N0RjfWmIwNLNCoUePyYVrjJXPWBNuy97.jpg" 
              alt="Handcrafted in India" 
              className="w-full max-w-5xl h-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-24">
        <motion.div 
          initial={{ scale: 1.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="text-[60vw] lg:text-[40vw] font-display leading-none">POSH</h2>
        </motion.div>
        
        <div className="text-center relative z-10 px-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display tracking-tighter mb-12"
          >
            READY TO ELEVATE?
          </motion.h3>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-posh-gold text-black px-10 lg:px-12 py-5 lg:py-6 rounded-full font-bold text-base lg:text-lg tracking-widest uppercase"
            >
              Join the Elite
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [shoes, setShoes] = useState<Shoe[]>(DEFAULT_SHOES);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(3);

        if (error) throw error;
        if (data && data.length > 0) {
          setShoes(data);
        }
      } catch (err) {
        console.error('Error fetching featured shoes:', err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-posh-black text-white selection:bg-posh-gold selection:text-black">
        <div className="grainy-overlay" />
        <AnimatePresence>
          {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
        </AnimatePresence>
        
        <CustomCursor />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home shoes={shoes} />} />
          <Route path="/explore" element={<ExploreCollection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
