"use client";

import * as React from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ParallaxBackground } from "@/components/ui/parallax-background";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
  className?: string;
  backgroundImage?: string;
}

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

export function StatsSection({
  title,
  subtitle,
  stats,
  className,
  backgroundImage,
}: StatsSectionProps) {
  return (
    <section
      className={cn(
        "w-full py-20 lg:py-32 relative overflow-hidden",
        className
      )}
    >
      {/* Background with Parallax */}
      {backgroundImage && (
        <ParallaxBackground
          image={backgroundImage}
          opacity={0.5}
          overlayOpacity={0.4}
          bgColor="bg-superweld-bg"
        />
      )}

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {subtitle && (
              <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-superweld-text max-w-3xl mx-auto">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-superweld-text mb-3">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-superweld-textMuted text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



