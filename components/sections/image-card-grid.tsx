"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  href?: string;
}

interface ImageCardGridProps {
  title?: string;
  subtitle?: string;
  cards: CardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ImageCardGrid({
  title,
  subtitle,
  cards,
  columns = 3,
  className,
}: ImageCardGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className={cn("w-full py-20 lg:py-32", className)}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {subtitle && (
              <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-superweld-text max-w-3xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={cn("grid gap-6", getGridCols())}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-superweld-text mb-2 group-hover:text-superweld-orange transition-colors">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-superweld-textMuted opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                      {card.description}
                    </p>
                  )}
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-superweld-bg/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-superweld-orange">
                  <ArrowUpRight className="w-5 h-5 text-superweld-text" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



