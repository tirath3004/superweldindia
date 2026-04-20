"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FullWidthVisualSectionProps {
  image?: string;
  video?: string;
  overlayText?: string;
  overlayPosition?: "center" | "left" | "right";
  parallax?: boolean;
  height?: string;
  className?: string;
}

export function FullWidthVisualSection({
  image = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80",
  video,
  overlayText,
  overlayPosition = "center",
  parallax = true,
  height = "h-[60vh] lg:h-[80vh]",
  className,
}: FullWidthVisualSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const getOverlayClasses = () => {
    switch (overlayPosition) {
      case "left":
        return "items-start text-left pl-8 lg:pl-20";
      case "right":
        return "items-end text-right pr-8 lg:pr-20";
      default:
        return "items-center text-center";
    }
  };

  return (
    <section
      ref={containerRef}
      className={cn("w-full relative overflow-hidden", height, className)}
    >
      {/* Media Container with Parallax */}
      <motion.div
        style={parallax ? { y, scale } : {}}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={image}
            alt="Visual"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        )}
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-superweld-bg/40" />

      {/* Text Content */}
      {overlayText && (
        <div
          className={cn(
            "relative z-10 h-full flex flex-col justify-center",
            getOverlayClasses()
          )}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-superweld-text max-w-4xl"
          >
            {overlayText}
          </motion.h2>
        </div>
      )}
    </section>
  );
}



