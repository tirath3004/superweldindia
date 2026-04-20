"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Package, Grid3X3, List, Search, Filter, ChevronRight, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import type { ProductCategory } from "@/types/products";

interface CategoryDetailClientProps {
  category: ProductCategory;
  otherCategories: ProductCategory[];
}

function ProductTableRow({ product, categorySlug }: { product: any; categorySlug: string }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-superweld-border hover:bg-superweld-bg/5 transition-colors group"
    >
      <td className="py-4 px-4">
        <Link href={`/products/${categorySlug}/${product.id}`} className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-superweld-bg/10 flex items-center justify-center overflow-hidden shrink-0">
            {product.images[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <Package className="w-6 h-6 text-superweld-text/30" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-superweld-text group-hover:text-superweld-orange transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-superweld-textMuted">{product.subCategory}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-superweld-orange/20 text-superweld-orange text-xs rounded">
              {product.variant}
            </span>
          </div>
        </Link>
      </td>
      <td className="py-4 px-4">
        <p className="text-sm text-superweld-textMuted line-clamp-2">{product.keyFeatures.slice(0, 2).join("; ")}</p>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-superweld-text">{product.availability}</span>
      </td>
      <td className="py-4 px-4">
        <Link
          href={`/products/${categorySlug}/${product.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-orange text-superweld-text text-sm font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          View Details
        </Link>
      </td>
    </motion.tr>
  );
}

function ProductGridCard({ product, categorySlug }: { product: any; categorySlug: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-superweld-light border border-superweld-border rounded-xl overflow-hidden hover:border-superweld-orange/50 transition-all"
    >
      {/* Product Image */}
      <Link href={`/products/${categorySlug}/${product.id}`} className="block relative aspect-square bg-superweld-bg/5">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-superweld-text/20" />
          </div>
        )}
        <span className="absolute top-3 left-3 px-2 py-1 bg-superweld-orange text-superweld-text text-xs font-semibold rounded">
          {product.variant}
        </span>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-superweld-textMuted mb-1">{product.subCategory}</p>
        <Link href={`/products/${categorySlug}/${product.id}`}>
          <h3 className="font-semibold text-superweld-text group-hover:text-superweld-orange transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-superweld-textMuted mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-3">
          {product.typicalApplications.slice(0, 2).map((app: string, idx: number) => (
            <span key={idx} className="px-2 py-0.5 bg-superweld-bg/10 text-superweld-textMuted text-xs rounded">
              {app}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-superweld-border">
          <span className="text-sm text-superweld-textMuted">{product.availability.split(";")[0]}</span>
          <Link
            href={`/products/${categorySlug}/${product.id}`}
            className="px-3 py-1.5 bg-superweld-orange text-superweld-text text-sm font-medium rounded hover:bg-superweld-orangeHover transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function CategoryDetailClient({ category, otherCategories }: CategoryDetailClientProps) {
  return (
    <>
      {/* B2B Catalog Header */}
      <section className="py-8 lg:py-12 bg-superweld-light border-b border-superweld-border">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-superweld-textMuted mb-6"
            >
              <Link href="/products" className="hover:text-superweld-text transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-superweld-text">{category.name}</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-superweld-text mb-3">
                  {category.name}
                </h1>
                <p className="text-superweld-textMuted max-w-2xl">
                  {category.description}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-6"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-superweld-orange">{category.products.length}</p>
                  <p className="text-sm text-superweld-textMuted">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-superweld-text">B2B</p>
                  <p className="text-sm text-superweld-textMuted">Wholesale</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Toolbar */}
      <section className="py-4 border-b border-superweld-border sticky top-20 bg-superweld-bg/95 backdrop-blur z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-superweld-text/40" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text text-sm placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-textMuted text-sm hover:bg-superweld-bg/10 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-superweld-textMuted">View:</span>
              <button className="p-2 bg-superweld-orange text-superweld-text rounded">
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-superweld-bg/5 text-superweld-textMuted hover:text-superweld-text rounded">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - B2B Catalog Style */}
      <section className="py-8 lg:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {category.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.products.map((product) => (
                  <ProductGridCard
                    key={product.id}
                    product={product}
                    categorySlug={category.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-superweld-text/20 mx-auto mb-4" />
                <p className="text-superweld-textMuted text-lg">No products available in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bulk Order CTA */}
      <section className="py-12 lg:py-16 bg-superweld-light border-t border-superweld-border">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-linear-to-r from-superweld-orange/20 to-transparent border border-superweld-orange/30 rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-superweld-text mb-2">Need Bulk Orders?</h2>
                  <p className="text-superweld-textMuted">Contact us for wholesale pricing and custom orders. We offer competitive B2B rates.</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-orange text-superweld-text font-semibold rounded-xl hover:bg-superweld-orangeHover transition-colors shrink-0"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-superweld-text mb-6">Browse Other Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  className="group p-4 bg-superweld-light border border-superweld-border rounded-xl hover:border-superweld-orange/50 transition-all"
                >
                  <p className="font-medium text-superweld-text group-hover:text-superweld-orange transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-sm text-superweld-textMuted mt-1">{cat.products.length} products</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



