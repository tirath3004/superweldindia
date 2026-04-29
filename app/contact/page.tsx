"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Navbar, Footer } from "@/components/sections";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Navigation,
  Star,
  Package,
  Zap,
} from "lucide-react";

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
        className="absolute inset-0 bg-superweld-primary z-10"
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
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
          alt="Contact us"
          fill
          className="object-cover scale-110"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </motion.div>

      <motion.div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12" style={{ opacity }}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-primary/90 rounded-full text-white text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Contact Us
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Get in <span className="text-superweld-primary">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Contact us for bulk requirements, distribution inquiries, and partnerships. 
            Our team is ready to assist you with product sourcing, technical specifications, pricing, and orders.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Plot No.S/P-105, S-Block, MIDC Bhosari", "Pune - 411026, Maharashtra, India"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["07942718067", "Request a callback"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@superweldsources.com"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["+91 98906 63256"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section - WITH Parallax Background */}
      <HeroParallaxSection />

      {/* Contact Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white border border-superweld-border rounded-2xl p-8 lg:p-10 h-fit shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  SuperWeld Sources Pvt Ltd - Your Trusted Partner
                </p>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-superweld-border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-superweld-primary transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-superweld-border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-superweld-primary transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white border border-superweld-border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-superweld-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white border border-superweld-border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-superweld-primary transition-colors"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-superweld-border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-superweld-primary transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <Button size="lg" className="w-full bg-superweld-primary hover:bg-superweld-primaryHover group">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Contact Information
                  </h2>
                  <p className="text-sm text-gray-500 mb-6">
                    SuperWeld Sources Pvt Ltd
                  </p>
                  <p className="text-gray-600 mb-8">
                    Reach out to us through any of these channels. Our team is ready 
                    to assist you with your industrial equipment and tooling needs.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-superweld-primary/10 flex items-center justify-center text-superweld-primary shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        {item.details.map((detail) => (
                          <p key={detail} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="pt-6 border-t border-superweld-border">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://maps.google.com/?q=Plot+No.S/P-105,S-Block,MIDC+Bhosari,Pune"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-superweld-primary/10 text-superweld-primary text-sm rounded-lg hover:bg-superweld-primary hover:text-white transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </a>
                    <a
                      href="mailto:info@superweldsources.com"
                      className="flex items-center gap-2 px-4 py-2 bg-superweld-primary/10 text-superweld-primary text-sm rounded-lg hover:bg-superweld-primary hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                    <a
                      href="tel:07942718067"
                      className="flex items-center gap-2 px-4 py-2 bg-superweld-primary/10 text-superweld-primary text-sm rounded-lg hover:bg-superweld-primary hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/919890663256"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Full Width Google Map */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 bg-superweld-bgAlt">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-21/9 lg:aspect-3/1 bg-white border border-superweld-border rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.789!2d73.825!3d18.613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSuperweld+Sources+Bhosari!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - WITH Parallax */}
      <ParallaxSection className="py-24 lg:py-40 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Content Column - LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-superweld-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                  Support
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Have questions? We have answers. If you don&apos;t find what you&apos;re looking for, feel free to contact us directly.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      q: "What is your typical delivery time?",
                      a: "Standard delivery takes 3-5 business days. For urgent requirements, we offer express delivery within 1-2 days depending on location.",
                    },
                    {
                      q: "Do you provide bulk discounts?",
                      a: "Yes, we offer competitive bulk pricing for large orders. Contact our sales team for custom quotes on volume purchases.",
                    },
                    {
                      q: "What is your return policy?",
                      a: "We accept returns within 30 days for unopened products in original condition. Defective items are replaced immediately.",
                    },
                    {
                      q: "Do you offer product warranties?",
                      a: "Yes, all our products come with manufacturer warranties ranging from 6 months to 2 years depending on the product category.",
                    },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-5 bg-white border border-superweld-border rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-superweld-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {faq.q}
                          </h3>
                          <p className="text-gray-600 text-sm">{faq.a}</p>
                        </div>
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
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full"
              >
                <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/images/FAQ.jpg"
                    alt="Customer Support"
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

      {/* CTA Section */}
      <section className="py-24 lg:py-40 bg-superweld-primary text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
                Get in touch today for a free consultation and quote. We're here to help with all your industrial equipment needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="tel:07942718067"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
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




