"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const showcaseImages = [
  { id: 1, src: "/images/images/WOOD CUTTER CLIPPER RAPID.png", alt: "Industrial cutting tool" },
  { id: 2, src: "/images/images/FIBRE DISC ZIRKON+.png", alt: "Grinding disc" },
  { id: 3, src: "/images/images/CHOPSAW SPITFIRE XTREME.png", alt: "Chop saw" },
  { id: 4, src: "/images/images/CARBIDE GRINDING WHEELS GREEN GOLD.png", alt: "Grinding wheels" },
  { id: 5, src: "/images/images/ULTRA THIN WHEELS CHAMP (standard) 3.png", alt: "Cutting wheels" },
  { id: 6, src: "/images/images/ULTRA THIN WHEELS SPITFIRE LASER.png", alt: "Precision wheels" },
];

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".visual-header", {
        scrollTrigger: {
          trigger: ".visual-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Floating images animation
      imagesRef.current.forEach((ref, index) => {
        if (!ref) return;

        // Entrance animation
        gsap.from(ref, {
          scrollTrigger: {
            trigger: ref,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          scale: 0.8,
          opacity: 0,
          y: 60,
          rotation: index % 2 === 0 ? -5 : 5,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
        });

        // Continuous floating animation
        gsap.to(ref, {
          y: index % 2 === 0 ? -15 : 15,
          rotation: index % 2 === 0 ? 3 : -3,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10 lg:py-16 bg-superweld-bg overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="visual-header text-center mb-16">
            <span className="text-superweld-orange text-sm font-medium uppercase tracking-wider mb-4 block">
              Our Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-6">
              Precision Engineering
            </h2>
            <p className="text-superweld-textMuted text-lg max-w-2xl mx-auto">
              Visual journey through our industrial excellence
            </p>
          </div>

          {/* Creative Image Mosaic */}
          <div className="relative">
            {/* Desktop: Mosaic Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-2 lg:gap-6 lg:h-[700px]">
              {/* Large image - spans 7 columns, full height */}
              <div
                ref={(el) => { imagesRef.current[0] = el; }}
                className="col-span-7 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group"
              >
                <Image
                  src={showcaseImages[0].src}
                  alt={showcaseImages[0].alt}
                  fill
                  className="object-contain bg-superweld-surface p-8 group-hover:scale-105 transition-transform duration-700"
                  sizes="60vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-superweld-orange/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Top right - spans 5 columns */}
              <div
                ref={(el) => { imagesRef.current[1] = el; }}
                className="col-span-5 relative rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={showcaseImages[1].src}
                  alt={showcaseImages[1].alt}
                  fill
                  className="object-contain bg-superweld-surface p-6 group-hover:scale-110 transition-transform duration-500"
                  sizes="40vw"
                />
              </div>

              {/* Middle right - 2 small images side by side */}
              <div
                ref={(el) => { imagesRef.current[2] = el; }}
                className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={showcaseImages[2].src}
                  alt={showcaseImages[2].alt}
                  fill
                  className="object-contain bg-superweld-surface p-4 group-hover:scale-110 transition-transform duration-500"
                  sizes="20vw"
                />
              </div>

              <div
                ref={(el) => { imagesRef.current[3] = el; }}
                className="col-span-3 relative rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={showcaseImages[3].src}
                  alt={showcaseImages[3].alt}
                  fill
                  className="object-contain bg-superweld-surface p-4 group-hover:scale-110 transition-transform duration-500"
                  sizes="25vw"
                />
              </div>
            </div>

            {/* Tablet: 2x3 Grid */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:hidden">
              {showcaseImages.map((img, index) => (
                <div
                  key={img.id}
                  ref={(el) => { imagesRef.current[index] = el; }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain bg-superweld-surface p-6 group-hover:scale-110 transition-transform duration-500"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {showcaseImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative flex-shrink-0 w-72 aspect-square rounded-2xl overflow-hidden shadow-xl snap-center group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain bg-superweld-surface p-6"
                      sizes="300px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
