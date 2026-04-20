"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  showContactInfo?: boolean;
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryCta = { label: "Get Started", href: "#contact" },
  secondaryCta,
  backgroundImage,
  showContactInfo = false,
  className,
}: CTASectionProps) {
  return (
    <section className={cn("w-full relative overflow-hidden", className)}>
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="CTA background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-superweld-bg/85" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-superweld-orange z-0" />
      )}

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-superweld-text mb-6 leading-tight"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-superweld-text mb-10 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              variant={backgroundImage ? "default" : "secondary"}
              className="group text-base px-8"
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            {secondaryCta && (
              <Button
                size="lg"
                variant={backgroundImage ? "outline" : "ghost"}
                className="text-base px-8 border-white text-superweld-text hover:bg-superweld-bg/10"
              >
                {secondaryCta.label}
              </Button>
            )}
          </motion.div>

          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-superweld-text hover:text-superweld-text transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (234) 567-890</span>
              </a>
              <a
                href="mailto:info@superweld.com"
                className="flex items-center gap-2 text-superweld-text hover:text-superweld-text transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@superweld.com</span>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}



