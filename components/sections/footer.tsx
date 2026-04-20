"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Linkedin, Twitter, Facebook, Instagram, MessageCircle, Navigation } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const footerLinks = {
  categories: [
    { label: "Abrasive", href: "/products/abrasive" },
    { label: "Welding Electrodes", href: "/products/welding-electrodes" },
    { label: "Oxy Fuel Products", href: "/products/oxy-fuel" },
    { label: "Welding MIG / SAW Wires", href: "/products/mig-saw" },
    { label: "Welding TIG Wires", href: "/products/tig" },
    { label: "Equipments", href: "/products/equipments" },
    { label: "Welding Consumables & PPE", href: "/products/ppe" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "News", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Product Catalog", href: "/products" },
    { label: "Technical Support", href: "/contact" },
    { label: "FAQs", href: "#" },
    { label: "Delivery Info", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="w-full bg-superweld-light border-t border-superweld-border">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                <Image
                  src="/images/logo/superweld-sources-pvt-ltd-logo.png"
                  alt="SuperWeld Sources Pvt Ltd"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="space-y-1 mb-4">
              <p className="font-semibold text-superweld-text">Sanjeev Agarwal (Director)</p>
              <p className="text-sm text-superweld-textMuted">Superweld Sources Private Limited</p>
              <p className="text-xs text-superweld-textMuted/70">GST No.: 27AASCS9995D1ZE</p>
            </div>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Plot+No.S/P-105,+S-Block,+Midc+Bhosari,+Pune+-+411026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-superweld-textMuted hover:text-superweld-text transition-colors"
              >
                <MapPin className="w-5 h-5 text-superweld-orange shrink-0 mt-0.5" />
                <span className="text-sm">Plot No.S/P-105, S-Block, Midc Bhosari, Pune - 411026, Maharashtra, India</span>
              </a>
              <a
                href="tel:07942718067"
                className="flex items-center gap-3 text-superweld-textMuted hover:text-superweld-text transition-colors"
              >
                <Phone className="w-5 h-5 text-superweld-orange" />
                <span>07942718067</span>
              </a>
              <a
                href="mailto:superweld.sources@gmail.com"
                className="flex items-center gap-3 text-superweld-textMuted hover:text-superweld-text transition-colors"
              >
                <Mail className="w-5 h-5 text-superweld-orange" />
                <span>superweld.sources@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919890663256"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-500 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>+91 98906 63256 (WhatsApp)</span>
              </a>
            </div>
            <div className="flex gap-3 mt-4">
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
            </div>
          </div>

          {/* Categories Links */}
          <div className="lg:col-span-2">
            <h4 className="text-superweld-text font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-superweld-textMuted hover:text-superweld-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-superweld-text font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-superweld-textMuted hover:text-superweld-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="text-superweld-text font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-superweld-textMuted hover:text-superweld-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-superweld-text font-semibold mb-6">Stay Updated</h4>
            <p className="text-superweld-textMuted text-sm mb-4">
              Subscribe for industry insights and company updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-superweld-orange text-superweld-text font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-superweld-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-superweld-text/40 text-sm">
            &copy; {new Date().getFullYear()} SuperWeld. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-superweld-text/40 hover:text-superweld-orange transition-colors"
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



