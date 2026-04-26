"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Linkedin, Twitter, Facebook, Instagram, MessageCircle, Navigation, Zap, Settings, Shield, Wrench, Package, Factory, Circle, Flame, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  products: [
    { label: "Abrasive", href: "/products/abrasive", icon: Circle },
    { label: "Welding Electrodes", href: "/products/welding-electrodes", icon: Zap },
    { label: "Oxy Fuel Products", href: "/products/oxy-fuel", icon: Flame },
    { label: "Welding Mig Wire", href: "/products/welding-mig-wire", icon: Layers },
    { label: "Welding Tig Wire", href: "/products/welding-tig-wire", icon: Wrench },
    { label: "Welding Consumables & PPE", href: "/products/welding-consumables", icon: Shield },
  ],
  industries: [
    { label: "Construction", href: "/industries/construction", icon: Factory },
    { label: "Manufacturing", href: "/industries/manufacturing", icon: Settings },
    { label: "Automotive", href: "/industries/automotive", icon: Zap },
    { label: "Energy & Power", href: "/industries/energy", icon: Zap },
    { label: "Infrastructure", href: "/industries/infrastructure", icon: Factory },
    { label: "Engineering", href: "/industries/engineering", icon: Settings },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Leadership", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "News & Updates", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Product Catalog", href: "/products" },
    { label: "Technical Support", href: "/services" },
    { label: "Maintenance", href: "/services" },
    { label: "FAQs", href: "#" },
    { label: "Delivery Info", href: "#" },
    { label: "Returns", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/sharer.php?u=https://www.superweldsources.com/", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/i/flow/login?redirect_after_login=%2Fshare%3Furl%3Dhttps%3A%2F%2Fwww.superweldsources.com%2F", label: "X" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/images/logo/superweld-sources-pvt-ltd-logo.png"
                  alt="SuperWeld Sources Pvt Ltd"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your trusted industrial products distributor. 
              Delivering quality and reliability since 1999.
            </p>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Plot+No.S/P-105,S-Block,MIDC+Bhosari,Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <MapPin className="w-5 h-5 text-[#8B3A3A] shrink-0 mt-0.5" />
                <span className="text-sm">Plot No.S/P-105, S-Block, MIDC Bhosari, Pune - 411026, Maharashtra, India</span>
              </a>
              <a
                href="tel:07942718067"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-[#8B3A3A]" />
                <span>07942718067</span>
              </a>
              <a
                href="mailto:info@superweldsources.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-[#8B3A3A]" />
                <span>info@superweldsources.com</span>
              </a>
              <a
                href="https://wa.me/919890663256"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#8B3A3A] transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#8B3A3A] transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#8B3A3A] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#8B3A3A] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm">
                Subscribe to receive industry insights, product updates, and exclusive offers.
              </p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8B3A3A] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#8B3A3A] text-white font-medium rounded-lg hover:bg-[#7A2D2D] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SuperWeld Sources Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-gray-500 hover:text-[#8B3A3A] transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



