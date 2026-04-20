"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar, Footer, CTASection } from "@/components/sections";
import { ParallaxBackground } from "@/components/ui/parallax-background";
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
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Plot No.S/P-105, S-Block, Midc Bhosari", "Pune - 411026, Maharashtra, India"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["07942718067", "Request a callback"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["superweld.sources@gmail.com"],
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

      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <ParallaxBackground
          image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
          opacity={0.7}
          overlayOpacity={0.7}
          bgColor="bg-superweld-bg"
        />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-superweld-text mb-6">
              Get in Touch With Us
            </h1>
            <p className="text-lg text-superweld-textMuted">
              Looking for industrial welding products? Contact us for product inquiries, 
              technical specifications, pricing, and orders. Our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - 2 Column Layout */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-superweld-bg/5 border border-superweld-border rounded-2xl p-8 lg:p-10"
              >
                <h2 className="text-2xl font-bold text-superweld-text mb-2">
                  Contact Us
                </h2>
                <p className="text-sm text-superweld-textMuted mb-6">
                  Sanjeev Agarwal (Director) - Superweld Sources Private Limited
                </p>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-superweld-text mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-superweld-text mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-superweld-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-superweld-text mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange transition-colors"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-superweld-text mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <Button size="lg" className="w-full group">
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
                <h2 className="text-2xl font-bold text-superweld-text mb-2">
                  Contact Information
                </h2>
                <p className="text-sm text-superweld-textMuted mb-1">
                  Sanjeev Agarwal (Director)
                </p>
                <p className="text-xs text-superweld-textMuted/70 mb-6">
                  Superweld Sources Private Limited | GST No.: 27AASCS9995D1ZE
                </p>
                <p className="text-superweld-textMuted mb-8">
                  Reach out to us through any of these channels. Our team is ready 
                  to assist you with your welding and fabrication needs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-superweld-bg/5 border border-superweld-border rounded-xl hover:bg-superweld-bg/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-superweld-text mb-2">
                      {item.title}
                    </h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-superweld-textMuted text-sm">
                        {detail}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Plot+No.S/P-105,+S-Block,+Midc+Bhosari,+Pune+-+411026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-superweld-orange/10 text-superweld-orange text-sm rounded-lg hover:bg-superweld-orange hover:text-superweld-text transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href="mailto:superweld.sources@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 bg-superweld-orange/10 text-superweld-orange text-sm rounded-lg hover:bg-superweld-orange hover:text-superweld-text transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <a
                  href="tel:07942718067"
                  className="flex items-center gap-2 px-4 py-2 bg-superweld-orange/10 text-superweld-orange text-sm rounded-lg hover:bg-superweld-orange hover:text-superweld-text transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919890663256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 text-sm rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-superweld-bg/5 border border-superweld-border rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-superweld-text/40">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </section>

      {/* FAQ Section - Content LEFT, Image RIGHT */}
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
              >
                <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                  Support
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-superweld-textMuted text-lg mb-8 leading-relaxed">
                  Have questions? We have answers. If you don&apos;t find what you&apos;re looking for, feel free to contact us directly.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      q: "What is your typical project turnaround time?",
                      a: "Turnaround time varies based on project complexity. Simple repairs can be completed in 24-48 hours, while custom fabrication projects typically take 2-4 weeks.",
                    },
                    {
                      q: "Do you provide emergency welding services?",
                      a: "Yes, we offer 24/7 emergency repair services for critical situations. Contact our emergency line for immediate assistance.",
                    },
                    {
                      q: "What certifications do your welders hold?",
                      a: "All our welders are AWS certified, and many hold additional ASME and specialty certifications for specific industries.",
                    },
                    {
                      q: "Can you handle large-scale industrial projects?",
                      a: "Absolutely. Our facility and team are equipped to handle projects of any scale, from small repairs to large industrial fabrications.",
                    },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-5 bg-superweld-bg/5 border border-superweld-border rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-superweld-orange shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-base font-semibold text-superweld-text mb-1">
                            {faq.q}
                          </h3>
                          <p className="text-superweld-textMuted text-sm">{faq.a}</p>
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
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-superweld-orange/20 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700"
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
                        src="/images/additional_images/Untitled-9.png"
                        alt="FAQ Support"
                        fill
                        className="object-contain p-6 lg:p-8 transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="absolute -bottom-4 -right-4 lg:bottom-4 lg:right-4">
                    <div className="w-20 h-20 rounded-full bg-superweld-orange flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm font-bold text-center leading-tight">
                        24/7
                        <br />
                        Support
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Project?"
        description="Get in touch today for a free consultation and quote. We're here to help bring your vision to life."
        primaryCta={{ label: "Get Free Quote", href: "#contact" }}
        secondaryCta={{ label: "Call Us Now", href: "tel:07942718067" }}
        showContactInfo={true}
      />

      <Footer />
    </main>
  );
}




