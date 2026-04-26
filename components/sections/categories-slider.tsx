"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/types/products";

// Category images mapping
const categoryImages: Record<string, string> = {
  "cutting-grinding-wheels": "/images/images/ULTRA THIN WHEELS SPITFIRE LASER.png",
  "coated-abrasives": "/images/images/FIBRE DISC ZIRKON+.png",
  "non-woven-abrasive": "/images/images/CARBIDE GRINDING WHEELS GREEN GOLD.png",
  "welding-consumables": "/images/images/ULTRA THIN WHEELS CHAMP (standard) 3.png",
  "construction-products": "/images/images/WOOD CUTTER CLIPPER RAPID.png",
  "power-tools": "/images/images/CHOPSAW SPITFIRE XTREME.png",
};

export function CategoriesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const categories = PRODUCT_CATEGORIES.slice(0, 6);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const itemWidth = isMobile ? 160 : 200;
    const gap = isMobile ? 16 : 24;
    const scrollPosition = index * (itemWidth + gap);
    sliderRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? categories.length - 1 : activeIndex - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === categories.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(newIndex);
  };

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section className="py-20 lg:py-32 bg-superweld-light overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
              Our Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-4">
              Product Categories
            </h2>
            <p className="text-superweld-textMuted text-lg max-w-2xl mx-auto">
              Explore our comprehensive range of industrial welding products
            </p>
          </motion.div>

          {/* Selected Category Name Display */}
          <motion.div
            key={displayIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10 h-16"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-superweld-text">
              {categories[displayIndex]?.name}
            </h3>
            <p className="text-superweld-textMuted text-sm mt-2">
              {categories[displayIndex]?.shortDescription}
            </p>
          </motion.div>

          {/* Circular Slider */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-superweld-bg shadow-lg flex items-center justify-center text-superweld-text hover:bg-superweld-orange hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-superweld-bg shadow-lg flex items-center justify-center text-superweld-text hover:bg-superweld-orange hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider Container */}
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-14 sm:px-16 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category, index) => {
                const isActive = index === activeIndex;
                const isHovered = index === hoveredIndex;
                const isSelected = isActive || isHovered;

                return (
                  <motion.div
                    key={category.id}
                    className="shrink-0 snap-center"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => scrollToIndex(index)}
                  >
                    <Link href={`/products/${category.slug}`} className="block">
                      <div
                        className={`relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                          isSelected
                            ? "ring-4 ring-superweld-orange ring-offset-4 ring-offset-superweld-light scale-110"
                            : "ring-2 ring-superweld-border hover:ring-superweld-orange/50"
                        }`}
                      >
                        {/* Background Circle */}
                        <div className="absolute inset-0 bg-superweld-surface" />

                        {/* Image */}
                        <Image
                          src={categoryImages[category.id] || "/images/images/ULTRA THIN WHEELS SPITFIRE LASER.png"}
                          alt={category.name}
                          fill
                          className="object-contain p-3 sm:p-4 lg:p-6 transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                        />

                        {/* Overlay on hover */}
                        <div
                          className={`absolute inset-0 bg-superweld-orange/20 transition-opacity duration-300 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Product Count Badge */}
                        <div
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-superweld-orange text-white text-xs font-medium rounded-full transition-all duration-300 ${
                            isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          {category.products.length} products
                        </div>
                      </div>

                      {/* Category Name Below Circle */}
                      <div className="text-center mt-4">
                        <p
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isSelected ? "text-superweld-orange" : "text-superweld-textMuted"
                          }`}
                        >
                          {category.name}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-superweld-orange"
                      : "bg-superweld-border hover:bg-superweld-orange/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-bg/10 text-superweld-text font-medium rounded-lg hover:bg-superweld-bg/20 transition-colors border border-superweld-border"
            >
              View All Categories
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
