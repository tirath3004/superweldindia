"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Feature {
  text: string;
}

interface SplitSectionProps {
  title: string;
  description?: string;
  features?: Feature[];
  image: string;
  imagePosition?: "left" | "right";
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function SplitSection({
  title,
  description,
  features,
  image,
  imagePosition = "right",
  ctaLabel = "Learn More",
  ctaHref = "#",
  className,
}: SplitSectionProps) {
  const contentVariants = {
    hidden: { opacity: 0, x: imagePosition === "right" ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: imagePosition === "right" ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 },
    },
  };

  const ContentBlock = (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-superweld-textMuted mb-8 leading-relaxed">
          {description}
        </p>
      )}
      {features && features.length > 0 && (
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-superweld-orange/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-superweld-orange" />
              </div>
              <span className="text-superweld-text">{feature.text}</span>
            </motion.li>
          ))}
        </ul>
      )}
      <div>
        <Button size="lg" className="group">
          {ctaLabel}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );

  const ImageBlock = (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-linear-to-tr from-gray-900/30 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 p-6 bg-superweld-bg/80 backdrop-blur-sm rounded-xl border border-superweld-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-superweld-orange flex items-center justify-center">
            <Check className="w-6 h-6 text-superweld-text" />
          </div>
          <div>
            <div className="text-superweld-text font-semibold">Certified Quality</div>
            <div className="text-superweld-textMuted text-sm">ISO 9001:2015 Certified</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className={cn("w-full py-20 lg:py-32", className)}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            imagePosition === "left" && "lg:[direction:rtl]"
          )}
        >
          <div className={cn(imagePosition === "left" && "lg:[direction:ltr]")}>
            {imagePosition === "left" ? ImageBlock : ContentBlock}
          </div>
          <div className={cn(imagePosition === "left" && "lg:[direction:ltr]")}>
            {imagePosition === "left" ? ContentBlock : ImageBlock}
          </div>
        </div>
      </div>
    </section>
  );
}



