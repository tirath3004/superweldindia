"use client";

import { Navbar, Footer } from "@/components/sections";
import { FEATURED_CATEGORIES } from "@/types/products";
import { Package, ArrowRight, Zap, Settings, Shield, Wrench, Package as PackageIcon, Star, Scissors, Circle, Flame, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

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
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );
}

// Parallax Section Component
function ParallaxSection({ children, className = "", speed = 0.5 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 50}px`, `${-speed * 50}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative">{children}</motion.div>
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
    <section ref={ref} className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
          alt="Industrial products"
          fill
          className="object-cover scale-110"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </motion.div>

      <motion.div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12" style={{ opacity }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B3A3A]/90 rounded-full text-white text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            Product Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Products We
            <span className="text-[#8B3A3A]"> Distribute</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of high-quality industrial tools, equipment, and machinery sourced from leading manufacturers. We distribute products designed for precision, durability, and performance.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - WITH Parallax Background */}
      <HeroParallaxSection />

      {/* Product Categories Grid - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Distribution Categories
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Browse Product Categories
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                From power tools to industrial machinery, find the right products we distribute for your industrial needs.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_CATEGORIES.map((category, index) => {
                const iconMap: Record<string, React.ElementType> = {
                  Zap, Settings, Shield, Wrench, Package: PackageIcon, Star, Scissors, Circle, Flame, Layers
                };
                const Icon = iconMap[category.icon] || PackageIcon;
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
                      <div className="relative aspect-4/3 overflow-hidden">
                        <ImageReveal src={category.image} alt={category.name} className="absolute inset-0" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        {/* Product Count Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[#8B3A3A]">
                          {category.productCount} Products
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white mb-3">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-superweld-accent transition-colors">
                            {category.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-2 text-superweld-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
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

      {/* Quality Assurance Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                  Quality Assurance
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Committed to Excellence
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  All our products undergo rigorous quality testing to ensure they meet international standards. We are committed to delivering products that exceed customer expectations in terms of performance and reliability.
                </p>
                <ul className="space-y-4">
                  {[
                    "ISO 9001:2015 Certified Quality Management",
                    "Industry Certified Products",
                    "Rigorous Testing Protocols",
                    "Consistent Quality Standards"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-[#8B3A3A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-[#EDEDED] rounded-2xl p-8 lg:p-10 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Need Custom Solutions?
                </h3>
                <p className="text-gray-600 mb-8">
                  We offer custom sourcing capabilities for specialized requirements. Contact our team to discuss your specific needs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B3A3A] text-white font-medium rounded-lg hover:bg-[#7A2D2D] transition-all duration-300"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      <Footer />
    </main>
  );
}




