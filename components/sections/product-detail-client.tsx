"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, FileText, Mail, Phone, Package, Image as ImageIcon, Play, Quote, PhoneCall, ArrowUpRight, Heart, Share2, Shield, Truck, BadgeCheck, Star, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import type { Product, ProductCategory } from "@/types/products";
import { ProductRequestForm } from "@/components/product-request-form";

interface ProductDetailClientProps {
  product: Product;
  category: ProductCategory;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, category, relatedProducts }: ProductDetailClientProps) {
  // Track selected media (images and videos)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  // Track active tab
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "applications">("description");
  // Track request form modal
  const [showRequestForm, setShowRequestForm] = useState(false);
  // Track zoom position
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!mediaContainerRef.current) return;
    const rect = mediaContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Combine images, videos and posters into single media array
  const allMedia = [
    ...product.images.map((src) => ({ type: "image" as const, src })),
    ...product.videos.map((src) => ({ type: "video" as const, src })),
    ...product.posters.map((src) => ({ type: "poster" as const, src })),
  ];

  const handleMediaClick = (index: number, type: "image" | "video" | "poster") => {
    setSelectedMediaIndex(index);
    setIsVideo(type === "video");
  };

  // Get current media
  const currentMedia = allMedia[selectedMediaIndex];

  return (
    <>
      {/* WooCommerce Style Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-superweld-textMuted mb-6"
      >
        <Link href="/" className="hover:text-superweld-text transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-superweld-text transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/products/${category.slug}`} className="hover:text-superweld-text transition-colors">{category.name}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-superweld-text">{product.name}</span>
      </motion.nav>

      {/* WooCommerce Style Product Layout - Two Column */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        
        {/* Left Column - Product Images/Videos (WooCommerce Style) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Main Media Display (Image or Video) */}
          <div 
            ref={mediaContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative aspect-square bg-superweld-light border border-superweld-border rounded-2xl overflow-hidden group cursor-crosshair"
          >
            {currentMedia?.type === "video" ? (
              <video 
                controls 
                autoPlay
                className="w-full h-full object-cover"
              >
                <source src={currentMedia.src} type="video/mp4" />
              </video>
            ) : currentMedia?.type === "image" ? (
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={currentMedia.src} 
                  alt={product.name}
                  className={`w-full h-full object-contain transition-transform duration-200 ease-out ${isHovering ? 'scale-140' : 'scale-100'}`}
                  style={isHovering ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
                />
              </div>
            ) : currentMedia?.type === "poster" ? (
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={currentMedia.src} 
                  alt="Product Poster"
                  className={`w-full h-full object-contain transition-transform duration-200 ease-out ${isHovering ? 'scale-140' : 'scale-100'}`}
                  style={isHovering ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-24 h-24 text-superweld-text/20" />
              </div>
            )}
            {/* Variant Badge */}
            <span className="absolute top-4 left-4 px-3 py-1.5 bg-superweld-orange text-superweld-text text-sm font-bold rounded-lg z-10">
              {product.variant}
            </span>
            {/* Wishlist & Share */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button className="p-2.5 bg-superweld-bg/10 hover:bg-superweld-bg/20 backdrop-blur rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-superweld-text" />
              </button>
              <button className="p-2.5 bg-superweld-bg/10 hover:bg-superweld-bg/20 backdrop-blur rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-superweld-text" />
              </button>
            </div>
            {/* Play indicator for video */}
            {currentMedia?.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 bg-superweld-orange/90 rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-superweld-text fill-white ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Combined Thumbnail Gallery - Horizontal Scroll */}
          {allMedia.length > 0 && (
            <div className="relative">
              <div 
                className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-2"
                style={{ scrollbarWidth: "thin", msOverflowStyle: "none" }}
              >
                {/* Image Thumbnails */}
                {product.images.map((img, index) => (
                  <button
                    key={`img-${index}`}
                    onClick={() => handleMediaClick(index, "image")}
                    className={`shrink-0 w-20 h-20 bg-superweld-light border-2 rounded-xl overflow-hidden transition-all ${
                      !isVideo && selectedMediaIndex === index 
                        ? "border-superweld-orange ring-2 ring-superweld-orange/30" 
                        : "border-superweld-border hover:border-superweld-border"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                
                {/* Video Thumbnails */}
                {product.videos.map((video, index) => {
                  const mediaIndex = product.images.length + index;
                  return (
                    <button
                      key={`video-${index}`}
                      onClick={() => handleMediaClick(mediaIndex, "video")}
                      className={`shrink-0 w-20 h-20 bg-superweld-light border-2 rounded-xl overflow-hidden relative transition-all ${
                        isVideo && selectedMediaIndex === mediaIndex 
                          ? "border-superweld-orange ring-2 ring-superweld-orange/30" 
                          : "border-superweld-border hover:border-superweld-border"
                      }`}
                    >
                      <video className="w-full h-full object-cover opacity-60">
                        <source src={video} type="video/mp4" />
                      </video>
                      {/* Play icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-superweld-orange/90 rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-superweld-text fill-white ml-0.5" />
                        </div>
                      </div>
                    </button>
                  );
                })}
                
                {/* Poster Thumbnails */}
                {product.posters && product.posters.map((poster, index) => {
                  const mediaIndex = product.images.length + product.videos.length + index;
                  return (
                    <button
                      key={`poster-${index}`}
                      onClick={() => handleMediaClick(mediaIndex, "poster")}
                      className={`shrink-0 w-20 h-20 bg-superweld-light border-2 rounded-xl overflow-hidden transition-all ${
                        selectedMediaIndex === mediaIndex
                          ? "border-superweld-orange ring-2 ring-superweld-orange/30"
                          : "border-superweld-border hover:border-superweld-border"
                      }`}
                    >
                      <img src={poster} alt={`Poster ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </motion.div>

        {/* Right Column - Product Details (WooCommerce Style) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Product Title & SKU */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-superweld-bg/10 text-superweld-textMuted text-xs rounded-full">
                {product.subCategory}
              </span>
              <span className="px-3 py-1 bg-superweld-orange/20 text-superweld-orange text-xs rounded-full">
                {product.productLine}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-superweld-text mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-superweld-textMuted text-sm">SKU: {product.id.toUpperCase()}</p>
          </div>

          {/* Short Description */}
          <p className="text-lg text-superweld-textMuted leading-relaxed">
            {product.description}
          </p>

          {/* Availability Info */}
          <div className="p-4 bg-superweld-light border border-superweld-border rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <BadgeCheck className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-superweld-text">Available Sizes</span>
            </div>
            <p className="text-superweld-textMuted pl-8">{product.availability}</p>
          </div>

          {/* Action Buttons - WooCommerce Style */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => setShowRequestForm(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#8B3A3A] text-white font-bold rounded-xl hover:bg-[#7A2D2D] transition-all shadow-lg shadow-[#8B3A3A]/20 cursor-pointer"
            >
              <Quote className="w-5 h-5" />
              Request Quote
            </button>
            <a
              href="tel:07942718067"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-[#8B3A3A] font-bold rounded-xl border border-[#8B3A3A] transition-all"
            >
              <PhoneCall className="w-5 h-5" />
              Request Callback
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="flex flex-col items-center text-center p-3 bg-superweld-bg/5 rounded-xl">
              <Shield className="w-6 h-6 text-green-500 mb-2" />
              <span className="text-xs text-superweld-textMuted">Quality<br/>Guaranteed</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-superweld-bg/5 rounded-xl">
              <Truck className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-xs text-superweld-textMuted">Fast<br/>Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-superweld-bg/5 rounded-xl">
              <BadgeCheck className="w-6 h-6 text-superweld-orange mb-2" />
              <span className="text-xs text-superweld-textMuted">Certified<br/>Products</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-superweld-border text-sm">
            <span className="text-superweld-textMuted">Category:</span>
            <Link href={`/products/${category.slug}`} className="text-superweld-orange hover:underline">
              {category.name}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* WooCommerce Style Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <div className="border-b border-superweld-border mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 sm:gap-8 min-w-fit">
            <button 
              onClick={() => setActiveTab("description")}
              className={`pb-3 sm:pb-4 px-2 sm:px-0 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === "description" 
                  ? "text-superweld-orange border-superweld-orange" 
                  : "text-superweld-textMuted hover:text-superweld-text border-transparent"
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("specifications")}
              className={`pb-3 sm:pb-4 px-2 sm:px-0 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === "specifications" 
                  ? "text-superweld-orange border-superweld-orange" 
                  : "text-superweld-textMuted hover:text-superweld-text border-transparent"
              }`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab("applications")}
              className={`pb-3 sm:pb-4 px-2 sm:px-0 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === "applications" 
                  ? "text-superweld-orange border-superweld-orange" 
                  : "text-superweld-textMuted hover:text-superweld-text border-transparent"
              }`}
            >
              Applications
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "description" && (
              <>
                <div>
                  <h3 className="text-xl font-bold text-superweld-text mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-superweld-orange" />
                    Key Features
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-superweld-light border border-superweld-border rounded-xl">
                        <Star className="w-4 h-4 text-superweld-orange mt-0.5 shrink-0" />
                        <span className="text-superweld-text text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-superweld-textMuted leading-relaxed">
                    {product.description} Designed for professional use in industrial environments, 
                    this product delivers exceptional performance and reliability. Manufactured to 
                    meet strict quality standards with {product.keyFeatures.length}+ key features 
                    optimized for {product.typicalApplications.join(", ")}.
                  </p>
                </div>

              </>
            )}

            {activeTab === "specifications" && (
              <div className="bg-superweld-light border border-superweld-border rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-superweld-text mb-4 sm:mb-6 flex items-center gap-2">
                  <Check className="w-5 h-5 text-superweld-orange" />
                  Product Specifications
                </h3>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-sm min-w-[500px]">
                  <tbody>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted w-1/3">Product Name</td>
                      <td className="py-3 text-superweld-text font-medium">{product.fullProductName}</td>
                    </tr>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted">SKU</td>
                      <td className="py-3 text-superweld-text font-medium">{product.id.toUpperCase()}</td>
                    </tr>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted">Category</td>
                      <td className="py-3 text-superweld-text font-medium">{category.name}</td>
                    </tr>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted">Sub Category</td>
                      <td className="py-3 text-superweld-text font-medium">{product.subCategory}</td>
                    </tr>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted">Product Line</td>
                      <td className="py-3 text-superweld-text font-medium">{product.productLine}</td>
                    </tr>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted">Variant</td>
                      <td className="py-3 text-superweld-orange font-medium">{product.variant}</td>
                    </tr>
                    <tr className="border-b border-superweld-border">
                      <td className="py-3 text-superweld-textMuted">Availability</td>
                      <td className="py-3 text-superweld-text font-medium">{product.availability}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-superweld-textMuted">Features Count</td>
                      <td className="py-3 text-superweld-text font-medium">{product.keyFeatures.length} Key Features</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="bg-superweld-light border border-superweld-border rounded-2xl p-6">
                <h3 className="text-xl font-bold text-superweld-text mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-superweld-orange" />
                  Typical Applications
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.typicalApplications.map((app, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-superweld-bg/5 rounded-xl border border-superweld-border">
                      <Star className="w-4 h-4 text-superweld-orange shrink-0" />
                      <span className="text-superweld-text">{app}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-superweld-bg/5 rounded-xl">
                  <p className="text-superweld-textMuted text-sm">
                    This product is specifically designed and optimized for the above applications. 
                    For custom requirements or bulk orders, please contact our sales team.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Applications Sidebar - Always visible */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-superweld-light border border-superweld-border rounded-2xl">
              <h3 className="text-lg font-bold text-superweld-text mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.typicalApplications.map((app, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-superweld-bg/10 hover:bg-superweld-orange/20 border border-superweld-border hover:border-superweld-orange/30 rounded-lg text-superweld-text text-sm transition-all"
                  >
                    {app}
                  </span>
                ))}
              </div>

              {/* Product Specs */}
              <div className="mt-6 pt-6 border-t border-superweld-border">
                <h4 className="text-sm font-semibold text-superweld-text mb-3">Product Information</h4>
                <table className="w-full text-sm">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-superweld-border">
                      <td className="text-superweld-textMuted">Sub Category</td>
                      <td className="text-superweld-text">{product.subCategory}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-superweld-border">
                      <td className="text-superweld-textMuted">Product Line</td>
                      <td className="text-superweld-text">{product.productLine}</td>
                    </tr>
                    <tr className="flex justify-between py-2">
                      <td className="text-superweld-textMuted">Variant</td>
                      <td className="text-superweld-orange">{product.variant}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related Products - WooCommerce Style */}
      {relatedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 border-t border-superweld-border"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-superweld-text mb-6 sm:mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${category.slug}/${relatedProduct.id}`}
                  className="group bg-superweld-light border border-superweld-border rounded-xl overflow-hidden hover:border-superweld-orange/50 transition-all"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-superweld-bg/5 relative overflow-hidden">
                    {relatedProduct.images[0] ? (
                      <img 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-superweld-text/20" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-1 bg-superweld-orange text-superweld-text text-xs font-bold rounded">
                      {relatedProduct.variant}
                    </span>
                  </div>
                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <p className="text-[10px] sm:text-xs text-superweld-textMuted mb-1">{relatedProduct.subCategory}</p>
                    <h3 className="font-semibold text-superweld-text group-hover:text-superweld-orange transition-colors text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-superweld-textMuted line-clamp-1 mb-2 sm:mb-3">{relatedProduct.availability}</p>
                    <span className="inline-flex items-center gap-1 text-superweld-orange text-xs sm:text-sm font-medium">
                      View Details <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      )}
      {/* Request Form Modal */}
      <AnimatePresence>
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-superweld-bg/80 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowRequestForm(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-superweld-light border border-superweld-border rounded-2xl p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowRequestForm(false)}
                className="absolute top-4 right-4 p-2 text-superweld-textMuted hover:text-superweld-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <ProductRequestForm
                product={{
                  id: product.id,
                  name: product.name,
                  category: category.name,
                }}
                onClose={() => setShowRequestForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



