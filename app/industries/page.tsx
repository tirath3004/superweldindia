"use client";

import Image from "next/image";
import { Navbar, Footer, StatsSection } from "@/components/sections";
import { INDUSTRIES, PRODUCT_CATEGORIES } from "@/types/products";
import { motion } from "framer-motion";
import Link from "next/link";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { Factory, ArrowRight, CheckCircle, Package, Settings, Truck, Award, TrendingUp, Target } from "lucide-react";

const stats = [
  { value: 5, label: "Industries Served" },
  { value: 500, suffix: "+", label: "Products Available" },
  { value: 1000, suffix: "+", label: "Industry Clients" },
  { value: 100, suffix: "%", label: "Product Quality" },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
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
                <Factory className="w-4 h-4" />
                Industries Served
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-superweld-text mb-6 leading-tight">
                Welding Solutions for
                <span className="text-superweld-orange"> Every Industry</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-superweld-textMuted max-w-3xl mx-auto leading-relaxed">
                From construction to manufacturing, we provide high-quality welding products tailored to meet the specific needs of diverse industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Grid - No Parallax */}
      <section className="py-20 lg:py-32 bg-superweld-light">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content Column - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-1"
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Industries Served
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
                  Industries We Serve
                </h2>
                <p className="text-superweld-textMuted max-w-xl mb-8">
                  Delivering quality welding products to meet the demands of various industrial sectors
                </p>

                {/* Industries List */}
                <div className="space-y-4">
                  {INDUSTRIES.slice(0, 4).map((industry, index) => (
                    <motion.div
                      key={industry.id}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className="flex items-start gap-4 bg-superweld-bg/5 border border-superweld-border rounded-xl p-4 hover:border-superweld-orange/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                        <Factory className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-superweld-text">{industry.name}</h3>
                        <p className="text-superweld-textMuted text-sm line-clamp-1">{industry.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Image Column - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative order-2"
              >
                <div className="relative aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-br from-superweld-orange/20 to-blue-500/10 rounded-3xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700"
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
                        src="/images/additional_images/Untitled-3.png"
                        alt="Industries We Serve"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - With Parallax */}
      <StatsSection
        title="Industry Impact"
        subtitle="By The Numbers"
        stats={stats}
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
      />

      {/* Products for Industries */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
                Products for Every Industry
              </h2>
              <p className="text-superweld-textMuted max-w-2xl mx-auto">
                Explore our comprehensive product range designed to meet diverse industrial requirements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {PRODUCT_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/products/${category.slug}`}
                    className="flex items-start gap-4 p-6 bg-superweld-bg/5 border border-superweld-border rounded-xl hover:border-superweld-orange/30 hover:bg-superweld-bg/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-superweld-text group-hover:text-superweld-orange transition-colors mb-1">
                        {category.name}
                      </h3>
                      <p className="text-superweld-textMuted text-sm line-clamp-2">
                        {category.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Industries Choose Us - With Parallax */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
          opacity={0.7}
          overlayOpacity={0.7}
          bgColor="bg-superweld-bg"
        />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content Column - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-1"
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Our Advantages
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
                  Why Industries Choose Us
                </h2>
                <p className="text-superweld-textMuted max-w-xl mb-8">
                  Trusted by leading companies across multiple sectors for our commitment to quality, reliability, and expert support.
                </p>

                {/* Features List */}
                <div className="space-y-4">
                  {[
                    { title: "Industry Certified", desc: "All products meet international quality standards", icon: CheckCircle },
                    { title: "Wide Range", desc: "Comprehensive product catalog for diverse needs", icon: Package },
                    { title: "Reliable Supply", desc: "Consistent product availability and timely delivery", icon: Factory },
                    { title: "Technical Support", desc: "Expert guidance for product selection and application", icon: Settings },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-superweld-text">{item.title}</h3>
                        <p className="text-superweld-textMuted text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Image Column - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative order-2"
              >
                <div className="relative aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-br from-superweld-orange/20 to-blue-500/10 rounded-3xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700"
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
                        src="/images/additional_images/Untitled-4.png"
                        alt="Why Industries Choose Us"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners - Auto Scrolling Logos */}
      <section className="py-16 lg:py-24 bg-superweld-light overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
              Our Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-superweld-textMuted max-w-2xl mx-auto">
              We collaborate with world-renowned brands to deliver exceptional welding solutions
            </p>
          </motion.div>
        </div>

        {/* Infinite Scrolling Logos */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-superweld-light to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-superweld-light to-transparent z-10" />
          
          {/* Scrolling Container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-x gap-12 items-center py-8">
              {/* First set of logos */}
              {[
                { src: "/images/additional_images/Abicor_Binzel_Logo.png", name: "Abicor Binzel" },
                { src: "/images/additional_images/Ador_Logo.png", name: "Ador" },
                { src: "/images/additional_images/ESAB_Logo.png", name: "ESAB" },
                { src: "/images/additional_images/Grindwell_norton_logo.png", name: "Grindwell Norton" },
                { src: "/images/additional_images/Hyundai_Welding_Logo.png", name: "Hyundai Welding" },
                { src: "/images/additional_images/Kobelco_Logo.png", name: "Kobelco" },
                { src: "/images/additional_images/Lincoln_Electric_Logo.png", name: "Lincoln Electric" },
                { src: "/images/additional_images/Tweco_Logo.png", name: "Tweco" },
              ].map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="shrink-0 w-40 h-24 relative grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { src: "/images/additional_images/Abicor_Binzel_Logo.png", name: "Abicor Binzel" },
                { src: "/images/additional_images/Ador_Logo.png", name: "Ador" },
                { src: "/images/additional_images/ESAB_Logo.png", name: "ESAB" },
                { src: "/images/additional_images/Grindwell_norton_logo.png", name: "Grindwell Norton" },
                { src: "/images/additional_images/Hyundai_Welding_Logo.png", name: "Hyundai Welding" },
                { src: "/images/additional_images/Kobelco_Logo.png", name: "Kobelco" },
                { src: "/images/additional_images/Lincoln_Electric_Logo.png", name: "Lincoln Electric" },
                { src: "/images/additional_images/Tweco_Logo.png", name: "Tweco" },
              ].map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="shrink-0 w-40 h-24 relative grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - With Parallax */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
          opacity={0.7}
          overlayOpacity={0.85}
          bgColor="bg-superweld-bg"
        />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-6">
                Need Products for Your Industry?
              </h2>
              <p className="text-superweld-textMuted text-lg mb-8 max-w-2xl mx-auto">
                Contact us to discuss your specific product requirements. Our team will help you find the right welding solutions for your industry.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
                >
                  Get in Touch
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




