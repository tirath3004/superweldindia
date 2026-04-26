"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import { COMPANY_INFO, WHY_CHOOSE_US, INDUSTRIES } from "@/types/products";
import { ArrowRight, CheckCircle, Award, Users, Factory, TrendingUp, Target, Shield, Package, Globe, Clock, Truck, Zap, Settings, Star } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: 25, suffix: "+", label: "Years of Distribution Excellence" },
  { value: 100, suffix: "+", label: "Products Available" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 10, suffix: "+", label: "Industry Partners" },
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

// Animated Counter Component
function AnimatedCounter({ value, suffix, label, index, variant = "card" }: { value: number; suffix: string; label: string; index: number; variant?: "card" | "white" }) {
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

  if (variant === "white") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="text-center"
      >
        <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
          {count}{suffix}
        </div>
        <div className="text-white/80">{label}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-xl text-center"
    >
      <div className="text-3xl lg:text-4xl font-bold text-[#8B3A3A] mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
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
    <section ref={ref} className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
          alt="Industrial distribution facility"
          fill
          className="object-cover scale-110"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </motion.div>

      <motion.div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12" style={{ opacity }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                About Us
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-6">
                <span className="text-white">SUPER</span>
                <span className="text-[#8B3A3A]">WELD</span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                {COMPANY_INFO.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                Established in {COMPANY_INFO.established}, we have built a reputation as a trusted industrial products distributor, connecting leading manufacturers with businesses across India.
              </p>
            </motion.div>

            {/* Right - Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
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
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section - WITH Parallax Background */}
      <HeroParallaxSection />

      {/* Company Overview with Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
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
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Your Trusted Industrial Distribution Partner
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {COMPANY_INFO.whatWeDo}
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Established in {COMPANY_INFO.established}, we have grown to become a trusted name in industrial distribution. Our commitment to quality and customer satisfaction has helped us build long-lasting relationships with clients across multiple industries.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B3A3A] text-white font-medium rounded-lg hover:bg-[#7A2D2D] transition-all duration-300"
                  >
                    <Package className="w-5 h-5" />
                    Our Products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-[#EDEDED]"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                    alt="Welding workshop with professional equipment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#8B3A3A]/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#8B3A3A]" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">25+ Years</div>
                      <div className="text-sm text-gray-500">Industry Experience</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Vision & Mission - Image LEFT, Content RIGHT */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Column - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/images/Welding about 1.jpg"
                    alt="Heavy industrial workers welding"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Content Column - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                  Our Direction
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Vision & Mission
                </h2>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-[#EDEDED] rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white shrink-0">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">{COMPANY_INFO.vision}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border border-[#EDEDED] rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white shrink-0">
                        <Factory className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Distribution Network</h3>
                        <p className="text-gray-600 leading-relaxed">{COMPANY_INFO.mission}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Why Choose Us Section - with Parallax Background */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Image with Parallax */}
        <ParallaxBackgroundImage 
          src="/images/images/why choose about.jpg" 
          alt="Industrial welding background" 
          opacity={0.85}
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
              <span className="text-white/80 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Our Strengths
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose Us
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We deliver excellence through our extensive distribution network, sourcing quality products from leading manufacturers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: CheckCircle, title: "Premium Quality", desc: "Rigorous quality standards ensure every product meets industrial requirements." },
                { icon: Truck, title: "Fast Delivery", desc: "Efficient logistics network ensures timely delivery across all locations." },
                { icon: Factory, title: "Distribution Expertise", desc: "25+ years of experience distributing to diverse industrial sectors." },
                { icon: Shield, title: "Reliable Support", desc: "Dedicated support team available to assist with all your needs." },
                { icon: Package, title: "Wide Selection", desc: "100+ products across multiple categories to meet your needs." },
                { icon: Star, title: "Customer Focus", desc: "We work closely with customers to provide tailored solutions." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#8B3A3A] flex items-center justify-center text-white mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <ParallaxSection className="py-24 lg:py-40 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/images/About innovation.jpg"
                    alt="Industrial innovation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Content - RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-[#8B3A3A] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                  Innovation
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Advanced Industrial Solutions
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Our commitment to innovation drives us to source and distribute cutting-edge industrial tools 
                  and equipment that meet the evolving needs of modern industry. From automation to specialized 
                  applications, we deliver solutions that enhance productivity through reliable distribution.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-[#EDEDED]">
                    <Factory className="w-8 h-8 text-[#8B3A3A] mb-2" />
                    <h4 className="font-semibold text-gray-900">Industrial Grade</h4>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-[#EDEDED]">
                    <Zap className="w-8 h-8 text-[#8B3A3A] mb-2" />
                    <h4 className="font-semibold text-gray-900">High Performance</h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Industries Section - with Parallax Background */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Image with Parallax */}
        <ParallaxBackgroundImage
          src="/images/images/about who we serve.jpg"
          alt="Industries we serve"
          opacity={0.9}
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
              <span className="text-white/80 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Industries Served
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Who We Serve
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We provide industrial tools and equipment across diverse sectors
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Construction", icon: Factory },
                { name: "Manufacturing", icon: Settings },
                { name: "Automotive", icon: Zap },
                { name: "Energy", icon: Package },
                { name: "Infrastructure", icon: Truck },
                { name: "Engineering", icon: Target },
              ].map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col items-center text-center p-6 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl hover:border-[#8B3A3A]/50 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8B3A3A]/10 flex items-center justify-center text-[#8B3A3A] mb-4 group-hover:bg-[#8B3A3A] group-hover:text-white transition-all duration-300">
                    <industry.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#8B3A3A] transition-colors">
                    {industry.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
                Our Legacy
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
                  variant="white"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Work With Section */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5] overflow-hidden">
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
                Trusted Partners
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Brands We Work With
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We partner with leading manufacturers to bring you the best industrial products
              </p>
            </motion.div>

            {/* Auto-looping Marquee Carousel */}
            <div className="relative">
              {/* Gradient Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F5F5] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F5F5] to-transparent z-10" />
              
              {/* Scrolling Container */}
              <div className="flex overflow-hidden">
                <motion.div
                  className="flex gap-8 items-center"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 20,
                      ease: "linear",
                    },
                  }}
                >
                  {/* First set of logos */}
                  {[
                    "/images/additional_images/Abicor_Binzel_Logo.png",
                    "/images/additional_images/Ador_Logo.png",
                    "/images/additional_images/ESAB_Logo.png",
                    "/images/additional_images/Grindwell_norton_logo.png",
                    "/images/additional_images/Hyundai_Welding_Logo.png",
                    "/images/additional_images/Kobelco_Logo.png",
                    "/images/additional_images/Lincoln_Electric_Logo.png",
                    "/images/additional_images/Tweco_Logo.png",
                  ].map((logo, index) => (
                    <div
                      key={`logo-1-${index}`}
                      className="flex-shrink-0 w-32 h-20 bg-white rounded-xl p-3 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={logo}
                        alt="Brand logo"
                        width={120}
                        height={60}
                        className="object-contain max-h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {[
                    "/images/additional_images/Abicor_Binzel_Logo.png",
                    "/images/additional_images/Ador_Logo.png",
                    "/images/additional_images/ESAB_Logo.png",
                    "/images/additional_images/Grindwell_norton_logo.png",
                    "/images/additional_images/Hyundai_Welding_Logo.png",
                    "/images/additional_images/Kobelco_Logo.png",
                    "/images/additional_images/Lincoln_Electric_Logo.png",
                    "/images/additional_images/Tweco_Logo.png",
                  ].map((logo, index) => (
                    <div
                      key={`logo-2-${index}`}
                      className="flex-shrink-0 w-32 h-20 bg-white rounded-xl p-3 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={logo}
                        alt="Brand logo"
                        width={120}
                        height={60}
                        className="object-contain max-h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - with Parallax Background */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Image with Parallax */}
        <ParallaxBackgroundImage
          src="/images/images/about partner.jpg"
          alt="Partner with us background"
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Partner With Us
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Looking for reliable industrial tools and equipment for your business? Get in touch with our team today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B3A3A] text-white font-semibold rounded-lg hover:bg-[#7A2D2D] transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                  Start a Partnership
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-[#EDEDED]"
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




