"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  className?: string;
}

export function ProductCard({ product, categorySlug, className }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative bg-superweld-bg/5 border border-superweld-border rounded-2xl overflow-hidden",
        "hover:border-superweld-primary/50 hover:bg-superweld-bg/10 transition-all duration-300",
        className
      )}
    >
      <Link 
        href={`/products/${categorySlug}/${product.id}`}
        className="block p-6 lg:p-8 h-full"
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-superweld-text group-hover:text-superweld-primary transition-colors mb-3">
            {product.name}
          </h3>
          <p className="text-superweld-textMuted text-sm lg:text-base leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features Preview */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-superweld-primary mb-3 font-semibold">
            Key Features
          </h4>
          <ul className="space-y-2">
            {product.keyFeatures.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-superweld-textMuted text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-superweld-primary mt-2 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Applications Preview */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-superweld-primary mb-3 font-semibold">
            Applications
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.typicalApplications.slice(0, 2).map((app, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-superweld-bg/10 rounded-full text-xs text-superweld-text"
              >
                {app}
              </span>
            ))}
            {product.typicalApplications.length > 2 && (
              <span className="px-3 py-1 bg-superweld-primary/20 rounded-full text-xs text-superweld-primary">
                +{product.typicalApplications.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-superweld-primary font-medium text-sm group-hover:gap-3 transition-all">
          <span className="text-superweld-primary font-medium group-hover:translate-x-1 transition-transform">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}



