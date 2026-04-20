"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Circle, Box, Wrench, HardHat, Zap, Wind, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "abrasive",
    name: "Abrasive",
    description: "High-quality grinding wheels, cutting discs, and abrasive solutions for metal finishing and surface preparation.",
    icon: Circle,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
  },
  {
    id: "welding-electrodes",
    name: "Welding Electrodes",
    description: "Premium quality covered electrodes for all welding applications including mild steel, stainless steel, and cast iron.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  },
  {
    id: "oxy-fuel",
    name: "Oxy Fuel Products",
    description: "Complete range of gas cutting and welding equipment including torches, regulators, and cutting nozzles.",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
  },
  {
    id: "mig-saw",
    name: "Welding MIG / SAW Wires",
    description: "High-performance solid and flux-cored wires for MIG and submerged arc welding applications.",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
  },
  {
    id: "tig",
    name: "Welding TIG Wires",
    description: "Precision TIG welding rods for critical applications requiring clean, high-quality welds.",
    icon: Box,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
  },
  {
    id: "equipments",
    name: "Equipments",
    description: "Professional welding machines, plasma cutters, and industrial welding power sources.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
  },
  {
    id: "ppe",
    name: "Welding Consumables & PPE",
    description: "Safety equipment including welding helmets, gloves, jackets, and protective gear.",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1577083300638-3c4c0e5f7e3d?w=800&q=80",
  },
];

export function HoverCategoriesSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="py-20 lg:py-32 bg-superweld-bg">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-4">
              The Most Complete Line of
              <span className="text-superweld-orange"> Welding</span> and
              <span className="text-superweld-orange"> Cutting</span> Products.
            </h2>
            <p className="text-superweld-textMuted text-lg max-w-3xl mx-auto">
              SuperWeld&apos;s wide range of welding products spans virtually every product category and application, 
              allowing us to provide our customers with complete workflow solutions that work as hard as they do.
            </p>
            <p className="text-superweld-orange text-sm font-medium uppercase tracking-wider mt-4">
              Hover on a category to explore
            </p>
          </motion.div>

          {/* ESAB Style Layout - Categories on sides, Image in center */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Column - Categories */}
            <div className="space-y-2 order-2 lg:order-1">
              {categories.slice(0, 4).map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory.id === category.id;
                return (
                  <motion.div
                    key={category.id}
                    onMouseEnter={() => setActiveCategory(category)}
                    className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-superweld-orange/10 border-l-4 border-superweld-orange"
                        : "hover:bg-superweld-bg/50 border-l-4 border-transparent"
                    }`}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? "text-superweld-orange" : "text-superweld-textMuted"}`} />
                      <h3 className={`font-semibold ${isActive ? "text-superweld-orange" : "text-superweld-text"}`}>
                        {category.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Center - Image Display */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                  >
                    <Image
                      src={activeCategory.image}
                      alt={activeCategory.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-superweld-bg/80 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Center Circle with Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    key={activeCategory.id + "-circle"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-superweld-orange/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4"
                  >
                    <activeCategory.icon className="w-8 h-8 text-superweld-text mb-2" />
                    <span className="text-superweld-text font-bold text-sm sm:text-base leading-tight">
                      {activeCategory.name}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Column - Categories */}
            <div className="space-y-2 order-3">
              {categories.slice(4).map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory.id === category.id;
                return (
                  <motion.div
                    key={category.id}
                    onMouseEnter={() => setActiveCategory(category)}
                    className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-superweld-orange/10 border-r-4 border-superweld-orange"
                        : "hover:bg-superweld-bg/50 border-r-4 border-transparent"
                    }`}
                    whileHover={{ x: -8 }}
                  >
                    <div className="flex items-center gap-3 justify-end">
                      <h3 className={`font-semibold ${isActive ? "text-superweld-orange" : "text-superweld-text"}`}>
                        {category.name}
                      </h3>
                      <Icon className={`w-5 h-5 ${isActive ? "text-superweld-orange" : "text-superweld-textMuted"}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Description Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id + "-desc"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-12 text-center max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-superweld-text mb-4">{activeCategory.name}</h3>
              <p className="text-superweld-textMuted text-lg mb-6">{activeCategory.description}</p>
              <Link
                href={`/products/${activeCategory.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-orange text-superweld-text font-medium rounded-full hover:bg-superweld-orangeHover transition-colors"
              >
                Explore {activeCategory.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
