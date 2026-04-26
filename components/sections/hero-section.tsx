"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaPrimary?: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80",
  backgroundVideo,
  ctaPrimary = { label: "Get Started", href: "#contact" },
  ctaSecondary = { label: "Learn More", href: "#services" },
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex items-center overflow-hidden",
        className
      )}
    >
      {/* Background Video with Burn/Blur Effect */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/videos/1. Customer meet - Hindi.mp4" type="video/mp4" />
        </video>
        {/* Burn/Blur Overlay Effect - reduced for video visibility */}
        <div className="absolute inset-0 bg-superweld-primary/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-r from-superweld-bg/80 via-superweld-bg/60 to-superweld-bg/30" />
        <div className="absolute inset-0 bg-linear-to-t from-superweld-bg/60 via-transparent to-superweld-bg/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-32 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-superweld-primary/20 border border-superweld-primary/30 rounded-full text-superweld-primary text-sm font-medium mb-6">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-superweld-text leading-[0.95] tracking-tight mb-6"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg sm:text-xl text-superweld-textMuted max-w-2xl mb-10 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="group text-base px-8">
              {ctaPrimary.label}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group text-base px-8">
              <Play className="mr-2 w-4 h-4" />
              {ctaSecondary.label}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-20 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pb-8"
      >
        <div className="border-t border-superweld-border bg-superweld-bg/80 backdrop-blur-sm rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "25+", label: "Years Experience" },
              { value: "500+", label: "Projects Done" },
              { value: "50+", label: "Expert Team" },
              { value: "100%", label: "Quality Assurance" },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-superweld-orange">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-superweld-textMuted mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}



