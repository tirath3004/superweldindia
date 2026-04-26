"use client";

import Image from "next/image";
import { Navbar, Footer } from "@/components/sections";
import { INDUSTRIES } from "@/types/products";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Factory, ArrowRight, CheckCircle, Package, Settings, Truck, Zap, Star, Target, Wrench, Shield } from "lucide-react";

const stats = [
  { value: 25, suffix: "+", label: "Years of Distribution Excellence" },
  { value: 100, suffix: "+", label: "Products Available" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 10, suffix: "+", label: "Industry Partners" },
];

// Animated Counter Component
function AnimatedCounter({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const duration = 2000;
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

// Parallax Background Image Component
function ParallaxBackgroundImage({ src, alt, opacity = 0.3 }: { src: string; alt: string; opacity?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className={`absolute inset-0 bg-gray-900/${Math.round(opacity * 100)}`} />
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
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80"
          alt="Industries we serve"
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
            <Factory className="w-4 h-4" />
            Industries Served
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Industrial Solutions for
            <span className="text-[#8B3A3A]"> Every Sector</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From construction to manufacturing, we provide high-quality industrial tools and equipment tailored to meet the specific needs of diverse industries.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - WITH Parallax Background */}
      <HeroParallaxSection />

      {/* Industries Grid - WITH Parallax */}
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
                Industries Served
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Industries We Serve
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Delivering quality industrial products to meet the demands of various sectors
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                // 4 industries matching home page
                { id: "construction", name: "Construction", desc: "Complete range of tools and equipment for construction projects of any scale.", icon: Factory, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
                { id: "manufacturing", name: "Manufacturing", desc: "Industrial machinery and precision tools for manufacturing operations.", icon: Settings, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
                { id: "automotive", name: "Automotive", desc: "Specialized tools and equipment for automotive repair and production.", icon: Zap, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80" },
                { id: "energy", name: "Energy & Power", desc: "Reliable equipment for energy sector operations and maintenance.", icon: Package, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
                // 2 additional industries with individual pages
                { id: "infrastructure", name: "Infrastructure", desc: "Heavy-duty tools for infrastructure development projects.", icon: Truck, image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80" },
                { id: "engineering", name: "Engineering", desc: "Precision instruments and tools for engineering applications.", icon: Target, image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600&q=80" },
              ].map((industry, index) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/industries/${industry.id}`} className="group block bg-white border border-[#EDEDED] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={industry.image} alt={industry.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-[#8B3A3A]/10 flex items-center justify-center text-[#8B3A3A] mb-4">
                        <industry.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#8B3A3A] transition-colors">{industry.name}</h3>
                      <p className="text-gray-600 text-sm">{industry.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B3A3A] text-white font-semibold rounded-lg hover:bg-[#7A2D2D] transition-colors"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Stats Section - WITH Parallax */}
      <section className="py-24 lg:py-40 bg-[#8B3A3A] text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-white/80 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Industry Impact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                By The Numbers
              </h2>
            </motion.div>

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
      </section>

      {/* Why Industries Choose Us - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                  Our Advantages
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Why Industries Choose Us
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Trusted by leading companies across multiple sectors for our commitment to quality, reliability, and expert support.
                </p>

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
                      <div className="w-12 h-12 rounded-xl bg-[#8B3A3A]/10 flex items-center justify-center text-[#8B3A3A] shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80"
                    alt="Industrial facility with welding operations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section - WITH Parallax Background Image */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Image with Parallax */}
        <ParallaxBackgroundImage 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" 
          alt="Industrial background" 
          opacity={0.85}
        />
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Need Products for Your Industry?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
                Contact us to discuss your specific requirements. Our team will help you find the right industrial solutions for your sector.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
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




