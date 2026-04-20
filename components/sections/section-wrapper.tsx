"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "default" | "dark" | "gradient" | "image";
  backgroundImage?: string;
  animate?: boolean;
  id?: string;
}

const spacingClasses = {
  sm: "py-12 lg:py-16",
  md: "py-16 lg:py-24",
  lg: "py-20 lg:py-32",
  xl: "py-24 lg:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  dark: "bg-superweld-light",
  gradient: "bg-linear-to-b from-background to-superweld-dark",
  image: "",
};

export function SectionWrapper({
  children,
  className,
  containerClassName,
  withContainer = true,
  spacing = "lg",
  background = "default",
  backgroundImage,
  animate = true,
  id,
}: SectionWrapperProps) {
  const content = (
    <>
      {/* Background Image */}
      {background === "image" && backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-superweld-bg/80" />
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          withContainer && "w-full px-4 sm:px-6 lg:px-8 xl:px-12",
          containerClassName
        )}
      >
        {children}
      </div>
    </>
  );

  if (animate) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "relative",
          spacingClasses[spacing],
          backgroundClasses[background],
          background === "image" && "overflow-hidden",
          className
        )}
      >
        {content}
      </motion.section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "relative",
        spacingClasses[spacing],
        backgroundClasses[background],
        background === "image" && "overflow-hidden",
        className
      )}
    >
      {content}
    </section>
  );
}



