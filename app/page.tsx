"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Navbar, Footer } from "@/components/sections";
import { COMPANY_INFO, INDUSTRIES, WHY_CHOOSE_US } from "@/types/products";
import { 
  ArrowRight, Package, Zap, Settings, Shield, Wrench, 
  ArrowUpRight, Factory, Clock, Truck, Star, CheckCircle,
  ChevronRight, Menu, X, Phone, Mail, MapPin, Flame, Layers
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
  { value: 25, suffix: "+", label: "Years of Distribution Excellence" },
  { value: 100, suffix: "+", label: "Products Available" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 10, suffix: "+", label: "Industry Partners" },
];

// Welding Product Categories
const FEATURED_CATEGORIES = [
  { id: "abrasive", name: "Abrasive", icon: Zap, image: "/images/images/Abrasive Category.jpeg", productCount: 13 },
  { id: "welding-electrodes", name: "Welding Electrodes", icon: Zap, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", productCount: 8 },
  { id: "oxy-fuel", name: "Oxy Fuel Products", icon: Flame, image: "/images/images/oxyfuel category.jfif", productCount: 6 },
  { id: "welding-mig-wire", name: "Welding Mig Wire", icon: Layers, image: "/images/images/Welding Mig wire.jpg", productCount: 5 },
  { id: "welding-tig-wire", name: "Welding Tig Wire", icon: Wrench, image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80", productCount: 5 },
  { id: "welding-consumables", name: "Welding Consumables & PPE", icon: Shield, image: "https://images.unsplash.com/photo-1577083300638-3c4c0e5f7e3d?w=600&q=80", productCount: 10 },
];

// Featured products from actual catalog
const FEATURED_PRODUCTS = [
  // Abrasive Products
  { 
    id: "ultra-thin-wheels-spitfire", 
    name: "Ultra Thin Wheels Spitfire", 
    category: "Abrasive", 
    categoryId: "abrasive",
    image: "/images/images/ULTRA THIN WHEELS SPITFIRE.png",
    description: "Premium ultra-thin cutting wheels with double net construction"
  },
  { 
    id: "ultra-thin-wheels-spitfire-laser", 
    name: "Ultra Thin Wheels Spitfire Laser", 
    category: "Abrasive", 
    categoryId: "abrasive",
    image: "/images/images/ULTRA THIN WHEELS SPITFIRE LASER.png",
    description: "2X life best-in-class cutting wheels for SS & MS"
  },
  { 
    id: "4-grinding-disc-spitfire", 
    name: "4\" Grinding Disc Spitfire", 
    category: "Abrasive", 
    categoryId: "abrasive",
    image: "/images/images/4 GRINDING DISC SPITFIRE.png",
    description: "Blue fired grains for superior life and faster cutting"
  },
  // Welding Electrodes
  { 
    id: "super-optimal-308l-15", 
    name: "SUPER OPTIMAL 308L-15", 
    category: "Welding Electrodes", 
    categoryId: "welding-electrodes",
    image: "/images/images/SUPER OPTIMAL 1.png",
    description: "Self-lifting slag, easy strike and re-strike, spatter free"
  },
  { 
    id: "super-optimal-316l-15", 
    name: "SUPER OPTIMAL 316L-15", 
    category: "Welding Electrodes", 
    categoryId: "welding-electrodes",
    image: "/images/images/SUPER OPTIMAL 1.png",
    description: "Superior weldability, controlled fluidity, best for all positions"
  },
  { 
    id: "super-optimal-312", 
    name: "SUPER OPTIMAL 312", 
    category: "Welding Electrodes", 
    categoryId: "welding-electrodes",
    image: "/images/images/SUPER OPTIMAL 1.png",
    description: "High strength joints, dissimilar steel welding, hot-cracking resistant"
  },
  // MIG Wire
  { 
    id: "weld-70s-6", 
    name: "WELD 70S-6", 
    category: "Welding MIG Wire", 
    categoryId: "welding-mig-wire",
    image: "/images/images/WELD 70S-6.jpg",
    description: "Copper-coated AWS ER70S-6, excellent feeding performance"
  },
  { 
    id: "71t1", 
    name: "71T1", 
    category: "Welding MIG Wire", 
    categoryId: "welding-mig-wire",
    image: "/images/images/71T1.jpg",
    description: "All position rutile flux cored wire for 100% CO2 shielding"
  },
  // TIG Wire
  { 
    id: "ok-autrod-308l", 
    name: "OK Autrod 308L", 
    category: "Welding TIG Wire", 
    categoryId: "welding-tig-wire",
    image: "/images/images/OK Autrod 308L.jpg",
    description: "Corrosion resisting Cr-Ni wire, low carbon, intergranular corrosion resistant"
  },
  { 
    id: "ok-autrod-316l", 
    name: "OK Autrod 316L", 
    category: "Welding TIG Wire", 
    categoryId: "welding-tig-wire",
    image: "/images/images/K Autrod 316L.jpg",
    description: "Cr-Ni-Mo wire, acid and chloride resistant, CE approved"
  },
  // Oxy Fuel
  { 
    id: "forked-torch-minitherm-z-pmye", 
    name: "Forked Torch MINITHERM", 
    category: "Oxy Fuel Products", 
    categoryId: "oxy-fuel",
    image: "/images/images/Forked Torch MINITHERM Z-PMYE.jpg",
    description: "Two single jet Copper heating nozzles for pipeline manufacture"
  },
  { 
    id: "handle-star-2020", 
    name: "Handle STAR 2020", 
    category: "Oxy Fuel Products", 
    categoryId: "oxy-fuel",
    image: "/images/images/Handle STAR 2020.jpg",
    description: "Robust handle for brazing, heating, cutting and welding"
  },
];

// Product tabs/categories for filtering
const PRODUCT_TABS = [
  { id: "all", name: "All Products" },
  { id: "abrasive", name: "Abrasive" },
  { id: "welding-electrodes", name: "Welding Electrodes" },
  { id: "welding-wire", name: "Welding Wire" },
  { id: "oxy-fuel", name: "Oxy Fuel" },
];

// Industries
const INDUSTRIES_DATA = [
  { id: "construction", name: "Construction", description: "Complete range of tools and equipment for construction projects of any scale.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
  { id: "manufacturing", name: "Manufacturing", description: "Industrial machinery and precision tools for manufacturing operations.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" },
  { id: "automotive", name: "Automotive", description: "Specialized tools and equipment for automotive repair and production.", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80" },
  { id: "energy", name: "Energy & Power", description: "Reliable equipment for energy sector operations and maintenance.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
];

// Image Reveal Component
function ImageReveal({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ x: 0 }}
        animate={isInView ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[#8B3A3A] z-10"
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

// Parallax Section Component
function ParallaxSection({ children, className = "", speed = 0.5 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 50}px`, `${-speed * 50}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative">
        {children}
      </motion.div>
    </div>
  );
}

// Parallax Background Image Component
function ParallaxBackgroundImage({ src, alt, opacity = 0.3 }: { src: string; alt: string; opacity?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      <motion.div style={{ y }} className="absolute inset-[-50px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 1 - opacity }} />
    </div>
  );
}

// Parallax Content Component (for content that moves at different speed)
function ParallaxContent({ children, speed = 0.3 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  );
}

// Animated Counter Component - counts when in view
function AnimatedCounter({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-5xl lg:text-6xl font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </motion.div>
  );
}

// Industry Card with Parallax Image
function IndustryCard({ industry }: { industry: { id: string; name: string; description: string; image: string } }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Image moves from -30px to 30px as card scrolls through view
  const imageY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  return (
    <div ref={ref} className="group h-full">
      <Link href={`/industries/${industry.id}`} className="block h-full">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
          {/* Image container with parallax - fixed height */}
          <div className="relative h-48 overflow-hidden shrink-0">
            <motion.div 
              className="absolute inset-[-30px]"
              style={{ y: imageY }}
            >
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </motion.div>
          </div>
          {/* Content always visible - flex grow to fill space */}
          <div className="p-6 bg-white flex-1 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-[#8B3A3A]/10 flex items-center justify-center text-[#8B3A3A] mb-3">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{industry.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Hero Parallax Section Component
function HeroParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[calc(100vh+100px)] flex items-center justify-center overflow-hidden pt-20 lg:pt-24 pb-32">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt="Industrial facility"
          fill
          className="object-cover scale-110"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </motion.div>

      <motion.div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12" style={{ opacity }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B3A3A]/90 rounded-full text-white text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              SuperWeld Sources Pvt Ltd
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Leading Distributor of
              <span className="text-superweld-accent"> Industrial</span>
              <br />Tools & Equipment
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              {COMPANY_INFO.whatWeDo}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B3A3A] text-white font-semibold rounded-lg hover:bg-[#7A2D2D] transition-all duration-300 shadow-lg"
              >
                <Package className="w-5 h-5" />
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Curved bottom edge - matches categories section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - WITH Parallax */}
      <HeroParallaxSection />

      {/* Product Categories Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Our Catalog
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of distributed industrial tools, equipment, and machinery
              </p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_CATEGORIES.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/products/${category.id}`}
                      className="group block bg-white border border-[#EDEDED] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
                    >
                      {/* Category Image */}
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white mb-3">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-superweld-accent transition-colors">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Shop by Industry Section - WITH Parallax */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Parallax Background Image */}
        <ParallaxBackgroundImage
          src="/images/images/home 2 section.webp"
          alt="Industries background"
          opacity={0.3}
        />
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Industries Served
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Shop by Industry
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Specialized solutions tailored for your specific industry needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {INDUSTRIES_DATA.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Featured Collection
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Featured Products
              </h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {PRODUCT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-[#8B3A3A] text-white"
                      : "bg-white text-gray-600 hover:text-[#8B3A3A] hover:bg-gray-50 border border-[#EDEDED]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_PRODUCTS.filter((product) => {
                if (activeTab === "all") return true;
                if (activeTab === "welding-wire") {
                  return product.category === "Welding MIG Wire" || product.category === "Welding TIG Wire";
                }
                if (activeTab === "oxy-fuel") {
                  return product.category === "Oxy Fuel Products";
                }
                return product.category.toLowerCase().replace(/\s+/g, "-") === activeTab;
              }).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/products/${product.categoryId}/${product.id}`} className="block">
                    {/* Product Card - White background, border, shadow */}
                    <div className="bg-white border border-[#EDEDED] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="relative aspect-4/3 overflow-hidden bg-gray-50 p-4">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-[#8B3A3A] flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-[#8B3A3A] font-medium mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#8B3A3A] transition-colors mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* About Us Section - NEW */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
              {/* Image Column - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -80, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col"
              >
                <div className="relative flex-1 min-h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
                      alt="Super Weld India Facility"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Experience Badge - On image bottom right */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-6 right-6 bg-[#8B3A3A] text-white p-6 rounded-2xl shadow-xl z-10"
                  >
                    <span className="text-4xl font-bold">25+</span>
                    <p className="text-sm">Years Experience</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Column - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between"
              >
                <div>
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block"
                  >
                    About Us
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
                  >
                    Leading Distributor of Industrial Welding Products
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-600 text-lg leading-relaxed mb-6"
                  >
                    Super Weld India is a trusted distributor in the welding industry, sourcing high-quality welding consumables, abrasives, and industrial tools from leading manufacturers. With over 25 years of experience, we distribute products to clients across construction, manufacturing, automotive, and energy sectors.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-gray-600 leading-relaxed mb-8"
                  >
                    Our commitment to quality, innovation, and customer satisfaction has made us a preferred partner for businesses seeking reliable welding solutions. We stock products from leading brands like ESAB, Superon India, Norton, and Messer.
                  </motion.p>
                </div>

                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="grid grid-cols-2 gap-4 mb-8"
                  >
                    {[
                      { icon: CheckCircle, text: "Quality Assured" },
                      { icon: Truck, text: "Fast Delivery" },
                      { icon: Package, text: "5000+ Products" },
                      { icon: Factory, text: "Distribution Network" },
                    ].map((item, index) => (
                      <motion.div 
                        key={item.text}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 cursor-default"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#8B3A3A]/10 flex items-center justify-center text-[#8B3A3A]">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-900">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B3A3A] text-white font-semibold rounded-lg hover:bg-[#7A2D2D] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Learn More About Us
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Why Choose Us Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              {/* Content Column - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                  Our Strengths
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose Us
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  We deliver excellence through quality products, expert support, and decades of industry experience.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: CheckCircle, title: "Premium Quality Products", desc: "Rigorous quality standards ensure every product meets industrial requirements." },
                    { icon: Truck, title: "Fast & Reliable Delivery", desc: "Efficient logistics network ensures timely delivery across all locations." },
                    { icon: Factory, title: "Distribution Expertise", desc: "25+ years of experience distributing to diverse industrial sectors." },
                    { icon: Star, title: "Customer Support", desc: "Dedicated support team available to assist with all your needs." },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Image Column - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex"
              >
                <div className="relative flex-1 min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80"
                      alt="Industrial workers"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Services Section - WITH Parallax Background */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Parallax Background Image */}
        <ParallaxBackgroundImage
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
          alt="Services background"
          opacity={0.2}
        />
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                What We Offer
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Services & Support
              </h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Comprehensive support services to keep your operations running smoothly
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Phone, title: "Technical Consultation", desc: "Expert advice to help you choose the right tools and equipment for your needs." },
                { icon: Truck, title: "Bulk Supply", desc: "Large quantity orders with competitive pricing for industrial-scale requirements." },
                { icon: Wrench, title: "Equipment Maintenance", desc: "Professional maintenance services to maximize equipment lifespan and performance." },
                { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer service for urgent requirements and technical queries." },
                { icon: Package, title: "Inventory Management", desc: "Streamlined inventory solutions to ensure you never run out of essential supplies." },
                { icon: Shield, title: "Quality Assurance", desc: "Every product undergoes strict quality checks before delivery." },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm border border-[#EDEDED] rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white mb-6">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#8B3A3A] text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Banner Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-gray-900"
            >
              {/* Background Image with overlay */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
                  alt="Industrial background"
                  fill
                  className="object-cover opacity-30"
                />
              </div>
              <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Upgrade Your Industrial Operations?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                  Get in touch with our team for personalized solutions and competitive quotes.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B3A3A] text-white font-semibold rounded-lg hover:bg-[#7A2D2D] transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Contact Us Today
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <Package className="w-5 h-5" />
                    Browse Products
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      <Footer />
    </main>
  );
}
