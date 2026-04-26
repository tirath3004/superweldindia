"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Navbar, Footer } from "@/components/sections";
import { Wrench, Factory, Cog, Package, ArrowRight, Phone, Truck, Shield, Clock, Users, Star } from "lucide-react";

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
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f095b?w=1920&q=80"
          alt="Our services"
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
            Our Services
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Comprehensive
            <span className="text-[#8B3A3A]"> Industrial</span>
            <br />Support Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From product consultation to logistics and maintenance, we provide end-to-end support for all your industrial equipment and tooling needs.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

const services = [
  {
    id: "product-consultation",
    title: "Product Consultation",
    description: "Expert guidance to help you select the right tools and equipment for your specific industrial needs.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    icon: Users,
  },
  {
    id: "bulk-supply",
    title: "Bulk Supply",
    description: "Large quantity orders with competitive pricing for industrial-scale requirements and projects.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    icon: Package,
  },
  {
    id: "equipment-maintenance",
    title: "Equipment Maintenance",
    description: "Professional maintenance services to maximize equipment lifespan and ensure optimal performance.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f095b?w=800&q=80",
    icon: Cog,
  },
  {
    id: "logistics-support",
    title: "Logistics & Delivery",
    description: "Comprehensive logistics solutions with timely delivery across all locations nationwide.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    icon: Truck,
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    description: "Rigorous quality checks and certifications to ensure every product meets industry standards.",
    image: "https://images.unsplash.com/photo-1581093458891-9f302e26d265?w=800&q=80",
    icon: Shield,
  },
  {
    id: "24-7-support",
    title: "24/7 Support",
    description: "Round-the-clock customer service for urgent requirements and technical queries.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
    icon: Phone,
  },
];

const capabilities = [
  { text: "5000+ Products in Catalog" },
  { text: "Nationwide Delivery Network" },
  { text: "24/7 Customer Support" },
  { text: "ISO 9001:2015 Certified" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - WITH Parallax Background */}
      <HeroParallaxSection />

      {/* Services Grid - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
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
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                End-to-end support for all your industrial equipment needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-[#EDEDED] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <ImageReveal src={service.image} alt={service.title} className="absolute inset-0" />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white mb-4">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Capabilities Section - WITH Parallax */}
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
                  Our Capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Delivering Excellence at Scale
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  We have the infrastructure and expertise to handle projects of any size. From small 
                  workshops to large industrial facilities, we deliver the same level of quality and service.
                </p>
                <ul className="space-y-4 mb-8">
                  {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-[#8B3A3A]" />
                      {cap.text}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B3A3A] text-white font-medium rounded-lg hover:bg-[#7A2D2D] transition-colors group"
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden">
                  <ImageReveal 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" 
                    alt="Our Capabilities" 
                    className="absolute inset-0"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Process Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
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
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Process
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Simple, efficient, and transparent service delivery
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consultation", desc: "Discuss your requirements with our experts", icon: Users },
                { step: "02", title: "Selection", desc: "We help you choose the right products", icon: Package },
                { step: "03", title: "Delivery", desc: "Fast and reliable logistics support", icon: Truck },
                { step: "04", title: "Support", desc: "Ongoing assistance and maintenance", icon: Clock },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8B3A3A] flex items-center justify-center text-white mx-auto mb-4">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold text-[#8B3A3A]/20 mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-24 lg:py-40 bg-[#8B3A3A] text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Need Custom Solutions?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
                Every project is unique. Let's discuss how we can support your specific industrial requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:07942718067"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}




