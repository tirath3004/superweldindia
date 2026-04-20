"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Navbar, Footer, StatsSection } from "@/components/sections";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { PRODUCT_CATEGORIES, COMPANY_INFO, INDUSTRIES, WHY_CHOOSE_US } from "@/types/products";
import { 
  ArrowRight, Package, Sparkles, ChevronRight, 
  Flame, Circle, Box, Wrench, HardHat, Zap, Wind,
  ArrowUpRight, Shield, Award, Factory, Clock, Truck
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Products Available" },
  { value: 50, suffix: "+", label: "Industry Partners" },
  { value: 100, suffix: "%", label: "Quality Assured" },
];

// Only the 7 specified categories
const FEATURED_CATEGORIES = [
  { id: "abrasive", name: "Abrasive", icon: Circle, image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" },
  { id: "welding-electrodes", name: "Welding Electrodes", icon: Zap, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" },
  { id: "oxy-fuel", name: "Oxy Fuel Products", icon: Flame, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80" },
  { id: "mig-saw", name: "Welding MIG / SAW Wires", icon: Wind, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80" },
  { id: "tig", name: "Welding TIG Wires", icon: Box, image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" },
  { id: "equipments", name: "Equipments", icon: Wrench, image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80" },
  { id: "ppe", name: "Welding Consumables & PPE", icon: HardHat, image: "https://images.unsplash.com/photo-1577083300638-3c4c0e5f7e3d?w=600&q=80" },
];

// Sample products for the innovations section
const SAMPLE_PRODUCTS = [
  { id: 1, name: "Xpert Grinding Wheel", category: "Abrasive", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80" },
  { id: 2, name: "Superon SS Electrodes", category: "Welding Electrodes", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
  { id: 3, name: "MIG 70S-6 Wire", category: "MIG/SAW Wires", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80" },
  { id: 4, name: "TIG 308L Wire", category: "TIG Wires", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80" },
  { id: 5, name: "ESAB Welding Machine", category: "Equipments", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("for-you");
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section - Product Focus */}
      <section className="relative min-h-[110vh] flex items-start pt-32 pb-32 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/videos/addtional%20videos/home_hero_video.mp4" type="video/mp4" />
          </video>
          {/* Burn/Blur Overlay Effect with Blue Shade */}
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-superweld-orange/10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-r from-superweld-bg/80 via-blue-50/60 to-superweld-bg/40" />
          <div className="absolute inset-0 bg-linear-to-t from-blue-900/30 via-transparent to-superweld-bg/20" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-orange/20 border border-superweld-orange/30 rounded-full text-superweld-orange text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Leading Industrial Manufacturer
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-superweld-text mb-6 leading-tight">
                High-Quality
                <span className="text-superweld-orange"> Welding</span>
                <br />Products for Industry
              </h1>
              
              <p className="text-lg sm:text-xl text-superweld-textMuted max-w-2xl mb-10 leading-relaxed">
                {COMPANY_INFO.whatWeDo}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-bg/10 text-superweld-text font-medium rounded-lg hover:bg-superweld-bg/20 transition-colors border border-superweld-border"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Curved Moon Shape Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L1440 120L1440 60C1440 60 1200 0 720 0C240 0 0 60 0 60L0 120Z"
              fill="var(--color-superweld-bg)"
            />
          </svg>
        </div>
      </section>

      {/* Featured Products Showcase Section */}
      {/* Shop by Category - ESAB Style */}
      <section className="py-20 lg:py-32 bg-superweld-dark">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-superweld-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Our Catalog
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-superweld-text mb-6">
                Shop by Category
              </h2>
              <p className="text-lg text-superweld-textMuted max-w-2xl mx-auto">
                Explore our comprehensive range of welding products and equipment
              </p>
            </motion.div>

            {/* Categories Grid - Modern Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Shop Our Latest Products and Innovations */}
      <section className="py-20 lg:py-32 bg-superweld-bg">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-superweld-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                New Arrivals
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-superweld-text mb-6">
                Shop Our Latest Products and Innovations
              </h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { id: "for-you", label: "For You" },
                { id: "featured", label: "Featured Products" },
                { id: "brand", label: "Shop by Brand" },
                { id: "industry", label: "Shop by Industry" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-superweld-orange text-superweld-text"
                      : "bg-superweld-light text-superweld-textMuted hover:text-superweld-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Product Cards - 3 on top, 2 centered below */}
            <div className="space-y-6">
              {/* Top Row - 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SAMPLE_PRODUCTS.slice(0, 3).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href="/products" className="block">
                      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-superweld-light">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-superweld-bg/0 group-hover:bg-superweld-bg/20 transition-colors" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-superweld-orange flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-superweld-text" />
                          </div>
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="text-sm text-superweld-orange font-medium mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-superweld-text group-hover:text-superweld-orange transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Row - 2 Centered Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {SAMPLE_PRODUCTS.slice(3, 5).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                    className="group"
                  >
                    <Link href="/products" className="block">
                      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-superweld-light">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-superweld-bg/0 group-hover:bg-superweld-bg/20 transition-colors" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-superweld-orange flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-superweld-text" />
                          </div>
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="text-sm text-superweld-orange font-medium mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-superweld-text group-hover:text-superweld-orange transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section 1 - ~350px height */}
      <section ref={parallaxRef} className="relative h-[350px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
            alt="Industrial welding"
            fill
            className="object-cover scale-110"
          />
          <div className="absolute inset-0 bg-superweld-bg/70" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-superweld-text mb-4">
              Precision <span className="text-superweld-orange">Welding</span>
            </h2>
            <p className="text-lg text-superweld-textMuted max-w-xl mx-auto">
              Industrial-grade solutions for every application
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parallax Section 2 - Sticky Scrolling */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1920&q=80"
              alt="Welding equipment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-superweld-bg/60" />
          </motion.div>
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                  className="bg-superweld-bg/80 backdrop-blur-md p-8 lg:p-12 rounded-3xl border border-superweld-border"
                >
                  <span className="text-superweld-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                    Innovation
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                    Next-Gen Welding Technology
                  </h2>
                  <p className="text-lg text-superweld-textMuted mb-8">
                    Experience the future of welding with our cutting-edge equipment and consumables. 
                    Designed for professionals who demand excellence.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-orange text-superweld-text font-semibold rounded-full hover:bg-superweld-orangeHover transition-colors"
                  >
                    Explore Products
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Image LEFT, Content RIGHT with Parallax */}
      <section className="relative py-16 lg:py-24 bg-superweld-light overflow-hidden">
        <ParallaxBackground image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80" opacity={0.15} />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Column - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-br from-superweld-orange/20 to-blue-500/10 rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700"
                    whileHover={{ scale: 1.02 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-superweld-bg rounded-3xl shadow-2xl overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src="/images/additional_images/Untitled-1.png"
                        alt="Why Choose Us"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="absolute -bottom-4 -left-4 lg:bottom-4 lg:left-4">
                    <div className="w-24 h-24 rounded-full bg-superweld-orange flex items-center justify-center text-white shadow-lg">
                      <span className="text-lg font-bold text-center leading-tight">
                        25+
                        <br />
                        Years
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Column - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Our Strengths
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  Why Choose Us
                </h2>
                <p className="text-superweld-textMuted text-lg mb-8 leading-relaxed">
                  We deliver excellence through quality products, expert support, and decades of industry experience.
                </p>

                <div className="space-y-4">
                  {WHY_CHOOSE_US.slice(0, 4).map((item, index) => {
                    const icons = [Shield, Award, Factory, Clock];
                    const Icon = icons[index] || Shield;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-superweld-text">{item.title}</h3>
                          <p className="text-superweld-textMuted text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section - Content LEFT, Image RIGHT */}
      <section className="relative py-16 lg:py-24 bg-superweld-bg overflow-hidden">
        <ParallaxBackground 
          image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80" 
          opacity={0.7}
          overlayOpacity={0.85}
          bgColor="bg-superweld-bg"
        />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content Column - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Industries Served
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  Who We Serve
                </h2>
                <p className="text-superweld-textMuted text-lg mb-8 leading-relaxed">
                  Our products serve diverse industries with reliable solutions tailored to meet specific industry requirements.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {INDUSTRIES.slice(0, 4).map((industry, index) => (
                    <motion.div
                      key={industry.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-superweld-light border border-superweld-border rounded-xl p-4 hover:border-superweld-orange/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-3">
                        <Factory className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-superweld-text mb-1">{industry.name}</h3>
                      <p className="text-superweld-textMuted text-xs">{industry.description.slice(0, 40)}...</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    href="/industries"
                    className="inline-flex items-center gap-2 text-superweld-orange font-medium hover:gap-3 transition-all group"
                  >
                    View All Industries
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image Column - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative order-first lg:order-last"
              >
                <div className="relative aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-superweld-orange/20 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700"
                    whileHover={{ scale: 1.02 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-superweld-light rounded-3xl shadow-2xl overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src="/images/additional_images/Untitled-2.png"
                        alt="Industries We Serve"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="absolute -bottom-4 -right-4 lg:bottom-4 lg:right-4">
                    <div className="w-20 h-20 rounded-full bg-superweld-orange flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm font-bold text-center leading-tight">
                        5+
                        <br />
                        Sectors
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection
        title="Numbers That Speak"
        subtitle="Our Impact"
        stats={stats}
        className="bg-superweld-dark"
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
      />

      {/* About Preview */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Diagonal Half Rectangle Cut Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-superweld-dark" />
          <div 
            className="absolute inset-0 bg-superweld-orange/10"
            style={{ 
              clipPath: 'polygon(100% 0, 100% 100%, 35% 100%, 65% 0)',
            }}
          />
          <div 
            className="absolute inset-0 bg-superweld-light/5"
            style={{ 
              clipPath: 'polygon(65% 0, 35% 100%, 0 100%, 0 0)',
            }}
          />
        </div>
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
                  About Us
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  {COMPANY_INFO.tagline}
                </h2>
                <p className="text-superweld-textMuted text-lg leading-relaxed mb-6">
                  {COMPANY_INFO.description}
                </p>
                <p className="text-superweld-textMuted leading-relaxed mb-8">
                  {COMPANY_INFO.whatWeDo}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-superweld-light border border-superweld-border rounded-2xl p-8 lg:p-10"
              >
                <h3 className="text-xl font-bold text-superweld-text mb-6">
                  Quick Links
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Browse Products", href: "/products" },
                    { label: "Industries We Serve", href: "/industries" },
                    { label: "About Our Company", href: "/about" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between p-4 bg-superweld-bg/5 rounded-lg hover:bg-superweld-bg/10 transition-colors group"
                    >
                      <span className="text-superweld-text group-hover:text-superweld-text">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-superweld-text/40 group-hover:text-superweld-orange group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-superweld-light">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                Ready to Order?
              </h2>
              <p className="text-superweld-textMuted text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with us for product inquiries, technical specifications, and pricing. Our team is ready to assist you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  <Truck className="w-5 h-5" />
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-bg/10 text-superweld-text font-medium rounded-lg hover:bg-superweld-bg/20 transition-colors border border-superweld-border"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}




