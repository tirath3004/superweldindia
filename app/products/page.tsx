"use client";

import { Navbar, Footer } from "@/components/sections";
import { CategoryCard } from "@/components/ui/category-card";
import { PRODUCT_CATEGORIES, FEATURED_CATEGORIES } from "@/types/products";
import { Package, ArrowRight, Circle, Zap, Flame, Wrench, Shield, Layers, Scissors, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxBackground } from "@/components/ui/parallax-background";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section - Product Catalog with Parallax */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Parallax Background */}
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
          opacity={0.7}
          overlayOpacity={0.7}
          bgColor="bg-superweld-bg"
        />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-orange/20 border border-superweld-orange/30 rounded-full text-superweld-orange text-sm font-medium mb-6">
                <Package className="w-4 h-4" />
                Product Catalog
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-superweld-text mb-6 leading-tight">
                Industrial Welding
                <span className="text-superweld-orange"> Products</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-superweld-textMuted max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive range of high-quality welding products designed for precision, durability, and performance in demanding industrial environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid - Home Page Style */}
      <section className="py-20 lg:py-32 bg-superweld-light">
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
              <span className="text-superweld-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Our Categories
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-4">
                Browse Product Categories
              </h2>
              <p className="text-superweld-textMuted text-lg max-w-2xl mx-auto">
                From welding electrodes to engineering components, find the right products for your industrial needs.
              </p>
            </motion.div>

            {/* Categories Grid - Home Page Style Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {FEATURED_CATEGORIES.map((category, index) => {
                // Map icon string to component
                const iconMap: Record<string, React.ElementType> = {
                  Circle, Zap, Flame, Wrench, Shield, Layers, Scissors, Settings
                };
                const Icon = iconMap[category.icon] || Circle;
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
                      className="group relative block bg-superweld-bg border border-superweld-border rounded-2xl overflow-hidden hover:border-superweld-orange transition-all duration-500"
                    >
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-superweld-bg via-superweld-bg/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 backdrop-blur-sm flex items-center justify-center text-superweld-orange">
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-superweld-text group-hover:text-superweld-orange transition-colors">
                            {category.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-2 text-superweld-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
      </section>

      {/* Quality Assurance Section with Parallax */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Parallax Background */}
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80"
          opacity={0.7}
          overlayOpacity={0.9}
          bgColor="bg-superweld-bg"
        />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Quality Assurance
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  Committed to Excellence
                </h2>
                <p className="text-superweld-textMuted text-lg leading-relaxed mb-6">
                  All our products undergo rigorous quality testing to ensure they meet international standards. We are committed to delivering products that exceed customer expectations in terms of performance and reliability.
                </p>
                <ul className="space-y-4">
                  {[
                    "ISO 9001:2015 Certified Quality Management",
                    "AWS Certified Products",
                    "Rigorous Testing Protocols",
                    "Consistent Quality Standards"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-superweld-text">
                      <span className="w-2 h-2 rounded-full bg-superweld-orange" />
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
                className="bg-superweld-light border border-superweld-border rounded-2xl p-8 lg:p-10"
              >
                <h3 className="text-2xl font-bold text-superweld-text mb-6">
                  Need Custom Solutions?
                </h3>
                <p className="text-superweld-textMuted mb-8">
                  We offer custom manufacturing capabilities for specialized requirements. Contact our team to discuss your specific needs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}




