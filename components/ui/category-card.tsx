"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/products";

interface CategoryCardProps {
  category: ProductCategory;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function CategoryCard({ category, className, variant = "default" }: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "group relative bg-superweld-bg/5 border border-superweld-border rounded-xl overflow-hidden",
          "hover:border-superweld-orange/50 hover:bg-superweld-bg/10 transition-all duration-300",
          className
        )}
      >
        <Link 
          href={`/products/${category.slug}`}
          className="block p-5 h-full"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-superweld-text group-hover:text-superweld-orange transition-colors mb-1">
                {category.name}
              </h3>
              <p className="text-superweld-textMuted text-sm line-clamp-2">
                {category.shortDescription}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-superweld-text/40 group-hover:text-superweld-orange group-hover:translate-x-1 transition-all shrink-0 ml-auto" />
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "group relative bg-linear-to-br from-gray-900/10 to-gray-900/5 border border-superweld-orange/30",
          "rounded-2xl overflow-hidden hover:border-superweld-orange transition-all duration-300",
          className
        )}
      >
        <Link 
          href={`/products/${category.slug}`}
          className="block p-8 h-full"
        >
          <div className="w-16 h-16 rounded-2xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-6">
            <Package className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-bold text-superweld-text group-hover:text-superweld-orange transition-colors mb-3">
            {category.name}
          </h3>
          
          <p className="text-superweld-textMuted mb-6 leading-relaxed">
            {category.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-superweld-textMuted">
              {category.products.length} Products
            </span>
            <div className="flex items-center gap-2 text-superweld-orange font-medium">
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative bg-superweld-bg/5 border border-superweld-border rounded-2xl overflow-hidden",
        "hover:border-superweld-orange/50 hover:bg-superweld-bg/10 transition-all duration-300",
        className
      )}
    >
      <Link 
        href={`/products/${category.slug}`}
        className="block p-6 lg:p-8 h-full"
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-6 group-hover:scale-110 transition-transform">
          <Package className="w-7 h-7" />
        </div>

        {/* Content */}
        <h3 className="text-xl lg:text-2xl font-bold text-superweld-text group-hover:text-superweld-orange transition-colors mb-3">
          {category.name}
        </h3>
        
        <p className="text-superweld-textMuted text-sm lg:text-base leading-relaxed mb-6">
          {category.shortDescription}
        </p>

        {/* Products Count & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-superweld-border">
          <span className="text-sm text-superweld-textMuted">
            {category.products.length} Products Available
          </span>
          <div className="flex items-center gap-2 text-superweld-orange font-medium text-sm group-hover:gap-3 transition-all">
            View Products
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}



