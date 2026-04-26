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
        <div className="absolute inset-0 hero-gradient z-0" />
      )}

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight text-shadow-hero"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
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
              variant="default"
              size="lg"
              className="font-medium bg-white text-superweld-primary hover:bg-white/90 btn-glow"
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            {secondaryCta && (
              <Button
                size="lg"
                variant="outline"
                className="font-medium border-white text-white hover:bg-white/10"
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
                href="tel:+919890663256"
                className="flex items-center gap-2 text-white hover:text-superweld-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+91 9890663256</span>
              </a>
              <a
                href="mailto:superweldpune@gmail.com"
                className="flex items-center gap-2 text-white hover:text-superweld-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>superweldpune@gmail.com</span>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}



