"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, PenTool, Factory, CheckCircle, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
  className?: string;
}

const defaultSteps: ProcessStep[] = [
  {
    id: "consultation",
    number: "01",
    title: "Consultation",
    description: "We understand your requirements and provide expert consultation to identify the best welding solution for your project.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description: "Our engineers create detailed designs and blueprints tailored to your specifications and industry standards.",
    icon: <PenTool className="w-6 h-6" />,
  },
  {
    id: "fabrication",
    number: "03",
    title: "Fabrication",
    description: "State-of-the-art welding and fabrication in our facility using advanced equipment and certified welders.",
    icon: <Factory className="w-6 h-6" />,
  },
  {
    id: "quality",
    number: "04",
    title: "Quality Check",
    description: "Rigorous quality assurance and testing protocols ensure every weld meets our high standards and your expectations.",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    id: "delivery",
    number: "05",
    title: "Delivery",
    description: "Safe and timely delivery to your location with full documentation and installation support if required.",
    icon: <Truck className="w-6 h-6" />,
  },
];

export function ProcessSection({
  title = "How We Work",
  subtitle = "Our Process",
  steps = defaultSteps,
  className,
}: ProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [hasSeenAll, setHasSeenAll] = useState(false);
  const [visitedCards, setVisitedCards] = useState<Set<number>>(new Set([0]));

  const nextCard = () => {
    if (activeIndex < steps.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      setVisitedCards(prev => new Set(prev).add(newIndex));
    }
  };

  const prevCard = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToCard = (index: number) => {
    setActiveIndex(index);
    setVisitedCards(prev => new Set(prev).add(index));
  };

  // Check if all cards have been visited
  useEffect(() => {
    if (visitedCards.size === steps.length && !hasSeenAll) {
      setHasSeenAll(true);
    }
  }, [visitedCards, steps.length, hasSeenAll]);

  return (
    <section 
      ref={sectionRef} 
      className={cn(
        "w-full py-20 lg:py-32 bg-superweld-light overflow-hidden",
        className
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 lg:mb-16"
        >
          <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
            {subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-superweld-text mb-4">
            {title}
          </h2>
          <p className="text-superweld-textMuted text-lg">
            Follow our proven 5-step process to bring your project from concept to completion
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-superweld-orange font-semibold">
              Card {activeIndex + 1} of {steps.length}
            </span>
            {hasSeenAll && (
              <span className="text-green-500 text-sm">(All cards viewed!)</span>
            )}
          </div>
        </motion.div>

        {/* Cards Container with Animation */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevCard}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-superweld-bg/10 border border-superweld-border flex items-center justify-center text-superweld-text hover:bg-superweld-orange hover:border-superweld-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextCard}
            disabled={activeIndex === steps.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-superweld-bg/10 border border-superweld-border flex items-center justify-center text-superweld-text hover:bg-superweld-orange hover:border-superweld-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Stack - Only Active Card Visible */}
          <div className="relative h-[400px] lg:h-[380px]">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              
              return (
                <motion.div
                  key={step.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                    x: isActive ? 0 : index < activeIndex ? -100 : 100,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 w-full max-w-2xl mx-auto left-0 right-0"
                  style={{ pointerEvents: isActive ? "auto" : "none" }}
                >
                  <div className="relative p-8 lg:p-10 bg-superweld-light border-2 border-superweld-orange rounded-3xl h-full shadow-2xl shadow-superweld-orange/20">
                    {/* Step Number - Large Background */}
                    <div className="absolute top-4 right-6 text-9xl font-bold text-superweld-text/5 select-none">
                      {step.number}
                    </div>

                    {/* Step Badge */}
                    <div className="absolute -top-4 left-10 px-5 py-2 bg-superweld-orange text-superweld-text text-sm font-bold rounded-full shadow-lg">
                      Step {step.number}
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-superweld-orange/20 flex items-center justify-center text-superweld-orange mb-8">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-3xl lg:text-4xl font-bold text-superweld-text mb-4">
                        {step.title}
                      </h3>
                      <p className="text-superweld-textMuted leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute bottom-6 left-10 right-10 h-1 bg-superweld-orange rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToCard(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === activeIndex 
                  ? "w-12 h-3 bg-superweld-orange" 
                  : visitedCards.has(index)
                    ? "w-3 h-3 bg-superweld-orange/50 hover:bg-superweld-orange"
                    : "w-3 h-3 bg-superweld-bg/30 hover:bg-superweld-bg/50"
              )}
              aria-label={`Go to step ${step.number}`}
            />
          ))}
        </div>

        {/* Navigation Hint */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-superweld-text/40 text-sm mt-6"
        >
          Click arrows or dots to navigate through all {steps.length} steps
        </motion.p>
      </div>
    </section>
  );
}



