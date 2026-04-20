"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxBackgroundProps {
  image: string;
  opacity?: number;
  overlayOpacity?: number;
  bgColor?: string;
  speed?: number;
}

export function ParallaxBackground({
  image,
  opacity = 0.2,
  overlayOpacity = 0.8,
  bgColor = "bg-superweld-light",
  speed = 0.5,
}: ParallaxBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Move background at different speed than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-[-20%] w-[140%] h-[140%]">
        <Image
          src={image}
          alt="Background"
          fill
          className="object-cover"
          style={{ opacity }}
          priority={false}
        />
      </motion.div>
      <div className={`absolute inset-0 ${bgColor}/${Math.round(overlayOpacity * 100)}`} />
    </div>
  );
}
