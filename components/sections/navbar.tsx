"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Package, Settings, Shield, Wrench, Zap, Factory, Phone, Mail, Circle, Flame, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Industries", href: "/industries", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const productCategories = [
  { name: "Abrasive", icon: Circle, href: "/products/abrasive", description: "13 grinding & cutting products" },
  { name: "Welding Electrodes", icon: Zap, href: "/products/welding-electrodes", description: "Mild & stainless steel electrodes" },
  { name: "Oxy Fuel Products", icon: Flame, href: "/products/oxy-fuel", description: "Torches, regulators & gas equipment" },
  { name: "Welding Mig Wire", icon: Layers, href: "/products/welding-mig-wire", description: "ER70S-6 & specialty MIG wires" },
  { name: "Welding Tig Wire", icon: Wrench, href: "/products/welding-tig-wire", description: "ER308L & aluminum TIG fillers" },
  { name: "Welding Consumables & PPE", icon: Shield, href: "/products/welding-consumables", description: "Helmets, gloves & accessories" },
];

const industries = [
  { name: "Construction", href: "/industries/construction" },
  { name: "Manufacturing", href: "/industries/manufacturing" },
  { name: "Automotive", href: "/industries/automotive" },
  { name: "Energy & Power", href: "/industries/energy" },
  { name: "Infrastructure", href: "/industries/infrastructure" },
  { name: "Engineering", href: "/industries/engineering" },
];

export function Navbar({ forceLight = false }: { forceLight?: boolean }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Force light appearance if prop is set (for pages with light backgrounds)
  const showLight = isScrolled || forceLight;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          showLight
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-superweld-border"
            : "bg-transparent"
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 group-hover:scale-105 transition-transform">
                <img
                  src="/images/logo/superweld-sources-pvt-ltd-logo.png"
                  alt="SuperWeld Sources Pvt Ltd"
                  className={cn(
                    "w-full h-full object-contain transition-all duration-300",
                    showLight ? "" : "brightness-0 invert"
                  )}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors relative flex items-center gap-1",
                      showLight ? "text-gray-700 hover:text-superweld-primary" : "text-white hover:text-white/80"
                    )}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-superweld-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-xl border border-superweld-border p-6 min-w-[600px]">
                        {link.label === "Products" ? (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Categories</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {productCategories.map((cat) => (
                                  <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-superweld-primary/10 flex items-center justify-center text-superweld-primary shrink-0">
                                      <cat.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">{cat.name}</div>
                                      <div className="text-xs text-gray-500">{cat.description}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="border-l border-superweld-border pl-4">
                              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Featured</h4>
                              <Link href="/products" className="block p-3 rounded-lg bg-superweld-primary/5 hover:bg-superweld-primary/10 transition-colors">
                                <div className="font-medium text-superweld-primary">View All Products</div>
                                <div className="text-xs text-gray-600 mt-1">100+ items in catalog</div>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {industries.map((ind) => (
                              <Link
                                key={ind.name}
                                href={ind.href}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Factory className="w-5 h-5 text-superweld-primary" />
                                <span className="font-medium text-gray-900">{ind.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:07942718067" className={cn(
                "flex items-center gap-2 text-sm font-medium",
                showLight ? "text-gray-700" : "text-white"
              )}>
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">07942718067</span>
              </a>
              <Link href="/contact">
                <Button
                  variant="default"
                  size="default"
                  className="font-medium bg-superweld-primary hover:bg-superweld-primaryHover text-white"
                >
                  Get Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden w-10 h-10 flex items-center justify-center",
                showLight ? "text-gray-900" : "text-white"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col items-start justify-start h-full pt-24 px-8 gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-gray-900 hover:text-superweld-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="w-full pt-6 border-t border-superweld-border"
              >
                <Button variant="default" size="lg" className="w-full bg-superweld-primary hover:bg-superweld-primaryHover text-white">
                  Get Quote
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                className="flex flex-col gap-3 text-sm text-gray-600"
              >
                <a href="tel:07942718067" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  07942718067
                </a>
                <a href="mailto:info@superweldsources.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@superweldsources.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



