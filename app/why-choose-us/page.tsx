"use client";

import { Navbar, Footer } from "@/components/sections";
import { WHY_CHOOSE_US, COMPANY_INFO, PRODUCT_CATEGORIES } from "@/types/products";
import { Shield, Award, Factory, Clock, CheckCircle, ArrowRight, Star, ThumbsUp, HeadphonesIcon, Package } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80"
          alt="Why choose us"
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
            <Star className="w-4 h-4" />
            Our Commitment
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="text-[#8B3A3A]">SuperWeld</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We are committed to delivering excellence in every product we manufacture. Discover what sets us apart as your trusted industrial welding partner.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default function WhyChooseUsPage() {
  const allFeatures = [
    {
      icon: Shield,
      title: "High-Quality Products",
      description: "All our products undergo rigorous quality testing to ensure they meet international standards and exceed customer expectations.",
      details: [
        "ISO 9001:2015 certified quality management",
        "Rigorous testing protocols",
        "Consistent product standards",
        "International certifications"
      ]
    },
    {
      icon: Award,
      title: "Reliable Performance",
      description: "Our welding consumables and products deliver consistent, reliable performance in demanding industrial environments.",
      details: [
        "Proven track record across industries",
        "Long-lasting durability",
        "Consistent batch quality",
        "Performance guaranteed"
      ]
    },
    {
      icon: Factory,
      title: "Industry Expertise",
      description: "With years of experience in welding and fabrication, we provide expert guidance and technical support for your projects.",
      details: [
        "25+ years of industry experience",
        "Technical consultation available",
        "Application-specific recommendations",
        "Industry knowledge base"
      ]
    },
    {
      icon: HeadphonesIcon,
      title: "Customer-Focused Approach",
      description: "We work closely with our customers to understand their needs and provide tailored solutions that match their requirements.",
      details: [
        "Dedicated customer support",
        "Personalized service",
        "Flexible order quantities",
        "After-sales support"
      ]
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Our efficient logistics and supply chain management ensure your products reach you on time, every time.",
      details: [
        "Nationwide delivery network",
        "Express shipping options",
        "Real-time order tracking",
        "Reliable delivery schedules"
      ]
    },
    {
      icon: Package,
      title: "Comprehensive Range",
      description: "From welding electrodes to engineering components, we offer a complete range of products for all your welding needs.",
      details: [
        "5 major product categories",
        "500+ products available",
        "Custom manufacturing options",
        "Complete welding solutions"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section - WITH Parallax Background */}
      <HeroParallaxSection />

      {/* Features Grid */}
      <section className="py-20 lg:py-32 bg-superweld-light">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-superweld-bg/5 border border-superweld-border rounded-2xl p-6 lg:p-8 hover:border-superweld-orange/30 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-6">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-superweld-text mb-3">{feature.title}</h3>
                  <p className="text-superweld-textMuted leading-relaxed mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-superweld-textMuted text-sm">
                        <CheckCircle className="w-4 h-4 text-superweld-orange shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
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
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
                Built on Trust
              </h2>
              <p className="text-superweld-textMuted max-w-2xl mx-auto">
                Our reputation is built on years of delivering quality products and exceptional service
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "25+", label: "Years Experience" },
                { value: "1000+", label: "Happy Customers" },
                { value: "500+", label: "Products" },
                { value: "99%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-superweld-light border border-superweld-border rounded-xl"
                >
                  <div className="text-4xl font-bold text-superweld-orange mb-2">{stat.value}</div>
                  <div className="text-superweld-textMuted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Link */}
      <section className="py-20 lg:py-32 bg-superweld-light">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-4">
                Our Product Range
              </h2>
              <p className="text-superweld-textMuted max-w-2xl mx-auto">
                Explore our comprehensive catalog of industrial welding products
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    className="flex items-center justify-between p-5 bg-superweld-bg/5 border border-superweld-border rounded-xl hover:border-superweld-orange/30 hover:bg-superweld-bg/10 transition-all group"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-superweld-text group-hover:text-superweld-orange transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-superweld-textMuted text-sm">{category.products.length} Products</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-superweld-text/30 group-hover:text-superweld-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-6">
                Experience the SuperWeld Difference
              </h2>
              <p className="text-superweld-textMuted text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us for their industrial welding product needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
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
                  Contact Us
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




