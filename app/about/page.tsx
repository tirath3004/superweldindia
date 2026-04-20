"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar, Footer, StatsSection, HoverCategoriesSection } from "@/components/sections";
import { COMPANY_INFO, WHY_CHOOSE_US, INDUSTRIES } from "@/types/products";
import { ArrowRight, CheckCircle, Award, Users, Factory, TrendingUp, Target, Shield, Flame, Circle, Box, Wrench, HardHat, Zap, Wind, Package, Globe, Clock, Truck } from "lucide-react";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import Link from "next/link";

const stats = [
  { value: 25, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Products Available" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 5, suffix: "", label: "Product Categories" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section - ESAB Style */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - Brand Name */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-superweld-text leading-none tracking-tight">
                  SUPER
                  <span className="text-superweld-orange">WELD</span>
                </h1>
                <p className="text-lg text-superweld-textMuted mt-4 font-medium tracking-wider">
                  INDUSTRIAL WELDING SOLUTIONS
                </p>
              </motion.div>

              {/* Right - Description */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:pt-8"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-superweld-text mb-6">
                  Leading Manufacturer & Supplier of Industrial Welding Products
                </h2>
                <p className="text-superweld-textMuted text-lg leading-relaxed mb-6">
                  {COMPANY_INFO.description}
                </p>
                <p className="text-superweld-textMuted leading-relaxed">
                  Established in {COMPANY_INFO.established}, we have built a reputation for excellence in the welding industry. Our commitment to quality and innovation drives everything we do.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview with Parallax */}
      <section className="relative py-20 lg:py-32 bg-superweld-light overflow-hidden">
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
          opacity={0.7}
          overlayOpacity={0.9}
          bgColor="bg-superweld-light"
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
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-6">
                  Leading Manufacturer of Industrial Welding Products
                </h2>
                <p className="text-superweld-textMuted text-lg leading-relaxed mb-6">
                  {COMPANY_INFO.whatWeDo}
                </p>
                <p className="text-superweld-textMuted leading-relaxed mb-8">
                  Established in {COMPANY_INFO.established}, we have grown to become a trusted name in the industrial welding sector. Our commitment to quality and customer satisfaction has helped us build long-lasting relationships with clients across multiple industries.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    Our Products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-bg/10 text-superweld-text font-medium rounded-lg hover:bg-superweld-bg/20 transition-colors border border-superweld-border"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Users, label: "Expert Team", value: "50+" },
                  { icon: Globe, label: "Industries Served", value: "5+" },
                  { icon: Package, label: "Products", value: "500+" },
                  { icon: TrendingUp, label: "Growth", value: "25+ Years" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-superweld-bg/5 border border-superweld-border rounded-xl p-6 text-center"
                  >
                    <stat.icon className="w-8 h-8 text-superweld-orange mx-auto mb-3" />
                    <div className="text-2xl font-bold text-superweld-text mb-1">{stat.value}</div>
                    <div className="text-superweld-textMuted text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Image LEFT, Content RIGHT */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
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
                    className="absolute inset-0 bg-linear-to-br from-superweld-orange/20 to-blue-500/10 rounded-3xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700"
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
                        src="/images/additional_images/Untitled-5.png"
                        alt="Our Vision and Mission"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
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
                  Our Direction
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  Vision & Mission
                </h2>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-superweld-bg/5 border border-superweld-border rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-superweld-text mb-2">Our Vision</h3>
                        <p className="text-superweld-textMuted leading-relaxed">{COMPANY_INFO.vision}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-superweld-bg/5 border border-superweld-border rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                        <Factory className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-superweld-text mb-2">Our Mission</h3>
                        <p className="text-superweld-textMuted leading-relaxed">{COMPANY_INFO.mission}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ESAB Style Product Categories - Hover with Changing Images */}
      <HoverCategoriesSection />

      {/* ESAB Style Triangle Angled Section */}
      <section className="py-20 lg:py-32 bg-superweld-light overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
              {/* Triangle Image - LEFT with angled edge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)',
                }}
              >
                <div className="relative aspect-4/3 bg-superweld-orange/10">
                  <Image
                    src="/images/additional_images/Untitled-2.png"
                    alt="Industrial Welding"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Content - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:pl-12"
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Innovation
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  Advanced Welding Solutions
                </h2>
                <p className="text-superweld-textMuted text-lg leading-relaxed mb-8">
                  Our commitment to innovation drives us to develop cutting-edge welding technologies 
                  that meet the evolving needs of modern industry. From automation to specialized applications, 
                  we deliver solutions that enhance productivity and quality.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-superweld-bg/50 rounded-xl border border-superweld-border">
                    <Factory className="w-8 h-8 text-superweld-orange mb-2" />
                    <h4 className="font-semibold text-superweld-text">Industrial Grade</h4>
                  </div>
                  <div className="p-4 bg-superweld-bg/50 rounded-xl border border-superweld-border">
                    <Zap className="w-8 h-8 text-superweld-orange mb-2" />
                    <h4 className="font-semibold text-superweld-text">High Performance</h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section with 6 Cards */}
      <section className="py-20 lg:py-32 bg-superweld-bg relative overflow-hidden">
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80"
          opacity={0.5}
          overlayOpacity={0.6}
          bgColor="bg-superweld-bg"
        />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                Industries Served
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
                Who We Serve
              </h2>
              <p className="text-superweld-textMuted max-w-2xl mx-auto">
                We provide welding solutions across diverse industries
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {INDUSTRIES.map((industry, index) => {
                const icons = [Factory, Truck, Package, Award, TrendingUp, Target];
                const Icon = icons[index % icons.length];
                return (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex flex-col items-center text-center p-8 lg:p-10 bg-superweld-bg/5 border border-superweld-border rounded-2xl hover:border-superweld-orange/50 hover:bg-superweld-orange/5 transition-all group cursor-pointer w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-26px)] min-w-[160px]"
                  >
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-6 group-hover:bg-superweld-orange group-hover:text-superweld-text transition-all duration-300">
                      <Icon className="w-10 h-10 lg:w-12 lg:h-12" />
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-superweld-text group-hover:text-superweld-orange transition-colors">
                      {industry.name}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats with Parallax */}
      <StatsSection
        title="Our Legacy"
        subtitle="By The Numbers"
        stats={stats}
        backgroundImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
      />

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
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-6">
                Partner With Us
              </h2>
              <p className="text-superweld-textMuted text-lg mb-8 max-w-2xl mx-auto">
                Looking for reliable welding products for your industrial needs? Get in touch with our team today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
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




