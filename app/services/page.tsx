"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  HeroSection,
  ImageCardGrid,
  ProcessSection,
  SplitSection,
  CTASection,
  Footer,
} from "@/components/sections";
import { Wrench, Factory, Cog, Flame, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: "mig-welding",
    title: "MIG Welding",
    description: "Metal Inert Gas welding for fast, high-quality production runs. Ideal for automotive and manufacturing applications.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tig-welding",
    title: "TIG Welding",
    description: "Tungsten Inert Gas welding for precision work on thin materials and critical applications.",
    image: "https://images.unsplash.com/photo-1535191042534-33aa8c43178a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "arc-welding",
    title: "Arc Welding",
    description: "Shielded Metal Arc Welding for heavy-duty industrial repairs and construction projects.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fabrication",
    title: "Metal Fabrication",
    description: "Complete fabrication services from cutting and bending to assembly and finishing.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cnc-machining",
    title: "CNC Machining",
    description: "Computer-controlled precision machining for complex parts and tight tolerances.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "repair",
    title: "Repair & Maintenance",
    description: "Expert repair services for all types of metal structures, equipment, and machinery.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
];

const capabilities = [
  { text: "Materials: Steel, Stainless Steel, Aluminum, Titanium" },
  { text: "Thickness: 0.5mm to 100mm" },
  { text: "Capacity: Projects up to 50 tons" },
  { text: "Certifications: AWS, ASME, ISO 9001" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero */}
      <HeroSection
        title="Comprehensive Welding & Fabrication Services"
        subtitle="Our Services"
        description="From precision TIG welding to heavy-duty fabrication, we deliver solutions for every industrial need."
        backgroundImage="https://images.unsplash.com/photo-1565514020126-6786cb4175d1?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Services Grid - 2 Column Layout */}
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
                        src="/images/additional_images/Untitled-8.png"
                        alt="Our Services"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="absolute -bottom-4 -left-4 lg:bottom-4 lg:left-4">
                    <div className="w-20 h-20 rounded-full bg-superweld-orange flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm font-bold text-center leading-tight">
                        6+
                        <br />
                        Services
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
                  Our Expertise
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  What We Offer
                </h2>
                <p className="text-superweld-textMuted text-lg mb-8 leading-relaxed">
                  From precision welding to heavy-duty fabrication, we provide comprehensive solutions tailored to your industrial needs.
                </p>

                {/* Services List */}
                <div className="space-y-4">
                  {[
                    { title: "MIG Welding", desc: "Fast, high-quality production welding for automotive and manufacturing", icon: Factory },
                    { title: "TIG Welding", desc: "Precision welding for thin materials and critical applications", icon: Wrench },
                    { title: "Metal Fabrication", desc: "Complete fabrication from cutting to assembly and finishing", icon: Cog },
                    { title: "CNC Machining", desc: "Computer-controlled precision for complex parts", icon: Flame },
                  ].map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-superweld-text">{service.title}</h3>
                        <p className="text-superweld-textMuted text-sm">{service.desc}</p>
                      </div>
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
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-orange text-white font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors group"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Split */}
      <SplitSection
        title="Our Capabilities"
        description="We work with a wide range of materials and specifications, ensuring we can handle any project that comes our way."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
        imagePosition="right"
        features={capabilities}
        ctaLabel="Request Quote"
        ctaHref="/contact"
      />

      {/* Process */}
      <ProcessSection
        title="How We Deliver Excellence"
        subtitle="Our Process"
      />

      {/* Industries Served */}
      <SplitSection
        title="Industries We Serve"
        description="Our expertise spans multiple industries, each with unique requirements and standards."
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
        imagePosition="left"
        features={[
          { text: "Construction - Structural steel and infrastructure" },
          { text: "Automotive - Precision components and frames" },
          { text: "Manufacturing - Industrial equipment and machinery" },
          { text: "Oil & Gas - Pipeline and refinery fabrication" },
        ]}
        ctaLabel="View Industries"
        ctaHref="/industries"
      />

      {/* CTA */}
      <CTASection
        title="Need a Custom Solution?"
        description="Every project is unique. Let's discuss how we can bring your specific requirements to life."
        primaryCta={{ label: "Get Quote", href: "/contact" }}
        secondaryCta={{ label: "Call Us", href: "tel:+1234567890" }}
        showContactInfo={true}
      />

      <Footer />
    </main>
  );
}




