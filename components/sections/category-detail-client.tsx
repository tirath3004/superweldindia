"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useRef, SetStateAction, Dispatch } from "react";
import { ArrowLeft, Package, Grid3X3, List, Search, Filter, ChevronRight, ShoppingCart, Star, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ProductCategory } from "@/types/products";

interface CategoryDetailClientProps {
  category: ProductCategory;
  allCategories: ProductCategory[];
}

// Helper function to extract unique values
function getUniqueValues(products: any[], key: string): string[] {
  const values = new Set<string>();
  products.forEach(p => {
    if (Array.isArray(p[key])) {
      p[key].forEach((v: string) => values.add(v));
    } else if (p[key]) {
      values.add(p[key]);
    }
  });
  return Array.from(values).sort();
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
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
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
      <div className="flex flex-col md:flex-row">
        {/* Product Image - Left Side */}
        <Link href={`/products/${categorySlug}/${product.id}`} className="block relative w-full md:w-48 lg:w-56 shrink-0 aspect-square md:aspect-auto md:min-h-[200px] bg-superweld-bg/5">
          {product.images[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-12 h-12 text-superweld-text/20" />
            </div>
          )}
          <span className="absolute top-3 left-3 px-2 py-1 bg-superweld-orange text-superweld-text text-xs font-semibold rounded">
            {product.variant}
          </span>
        </Link>

        {/* Product Info - Right Side */}
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-superweld-textMuted mb-1">{product.subCategory} • {product.brand}</p>
                <Link href={`/products/${categorySlug}/${product.id}`}>
                  <h3 className="font-semibold text-lg text-superweld-text group-hover:text-superweld-orange transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>
              </div>
            </div>
            
            <p className="text-sm text-superweld-textMuted mb-3 line-clamp-2">{product.description}</p>
            
            {/* Key Features */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.keyFeatures.slice(0, 4).map((feature: string, idx: number) => (
                <span key={idx} className="px-2 py-1 bg-superweld-bg/10 text-superweld-textMuted text-xs rounded">
                  {feature}
                </span>
              ))}
            </div>
            
            {/* Applications */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.typicalApplications.slice(0, 3).map((app: string, idx: number) => (
                <span key={idx} className="px-2 py-0.5 border border-superweld-border text-superweld-textMuted text-xs rounded">
                  {app}
                </span>
              ))}
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-4 border-t border-superweld-border">
            <div>
              <p className="text-xs text-superweld-textMuted mb-1">Available Sizes</p>
              <p className="text-sm text-superweld-text font-medium">{product.availability.split(";")[0]}</p>
            </div>
            <Link
              href={`/products/${categorySlug}/${product.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-orange text-superweld-text text-sm font-medium rounded-lg hover:bg-superweld-orangeHover transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Sidebar Filter Section Component
function FilterSection({ title, items, selectedItems, onToggle, isOpen, onToggleOpen }: {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-superweld-border last:border-b-0">
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-superweld-bg/5 transition-colors"
      >
        <span className="font-semibold text-superweld-text text-sm">{title}</span>
        <ChevronDown className={`w-4 h-4 text-superweld-textMuted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 max-h-48 overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => onToggle(item)}
                  className="w-4 h-4 rounded border-superweld-border bg-superweld-bg/5 text-superweld-orange focus:ring-superweld-orange"
                />
                <span className="text-sm text-superweld-textMuted group-hover:text-superweld-text transition-colors line-clamp-1">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Hierarchical Category Tree Component
function CategoryTree({ allCategories, currentCategoryId }: { allCategories: ProductCategory[]; currentCategoryId: string }) {
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set([currentCategoryId]));
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());

  const toggleCat = (catId: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const toggleSub = (subKey: string) => {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(subKey)) next.delete(subKey);
      else next.add(subKey);
      return next;
    });
  };

  return (
    <div className="space-y-1">
      {allCategories.map((cat) => {
        // Get sub-categories for this category
        const subCatsMap = new Map<string, Set<string>>();
        cat.products.forEach((p) => {
          if (!subCatsMap.has(p.subCategory)) {
            subCatsMap.set(p.subCategory, new Set());
          }
          if (p.brand) {
            subCatsMap.get(p.subCategory)?.add(p.brand);
          }
        });

        const isCatExpanded = expandedCats.has(cat.id);
        const isCurrentCat = cat.id === currentCategoryId;

        return (
          <div key={cat.id} className="border-b border-superweld-border/50 last:border-b-0">
            <button
              onClick={() => toggleCat(cat.id)}
              className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                isCurrentCat ? "bg-superweld-orange/10" : "hover:bg-superweld-bg/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <ChevronDown className={`w-3 h-3 text-superweld-textMuted transition-transform ${isCatExpanded ? "rotate-180" : ""}`} />
                <span className={`text-sm font-medium ${isCurrentCat ? "text-superweld-orange" : "text-superweld-text"}`}>
                  {cat.name}
                </span>
              </div>
              <span className="text-xs text-superweld-textMuted bg-superweld-bg/10 px-2 py-0.5 rounded">
                {cat.products.length}
              </span>
            </button>

            {isCatExpanded && (
              <div className="pl-6 py-1">
                {Array.from(subCatsMap.entries()).map(([subCat, brands]) => {
                  const subKey = `${cat.id}-${subCat}`;
                  const isSubExpanded = expandedSubs.has(subKey);
                  const brandList = Array.from(brands).sort();

                  return (
                    <div key={subKey}>
                      <button
                        onClick={() => toggleSub(subKey)}
                        className="w-full flex items-center justify-between py-1.5 px-2 rounded hover:bg-superweld-bg/5 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <ChevronDown className={`w-3 h-3 text-superweld-textMuted transition-transform ${isSubExpanded ? "rotate-180" : ""}`} />
                          <span className="text-xs text-superweld-textMuted">{subCat}</span>
                        </div>
                      </button>

                      {isSubExpanded && (
                        <div className="pl-5 py-1 space-y-0.5">
                          {brandList.length > 0 ? (
                            brandList.map((brand) => (
                              <Link
                                key={`${subKey}-${brand}`}
                                href={`/products/${cat.slug}`}
                                className="block py-1 px-2 text-xs text-superweld-textMuted/80 hover:text-superweld-orange transition-colors rounded hover:bg-superweld-bg/5"
                              >
                                {brand}
                              </Link>
                            ))
                          ) : (
                            <span className="block py-1 px-2 text-xs text-superweld-textMuted/50 italic">
                              No brands
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Product List Item for Sidebar
function ProductListItem({ product, categorySlug, isActive, onClick }: { product: any; categorySlug: string; isActive: boolean; onClick: () => void }) {
  return (
    <Link
      href={`/products/${categorySlug}/${product.id}`}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left ${
        isActive
          ? "bg-superweld-orange/20 border border-superweld-orange/50"
          : "hover:bg-superweld-bg/5 border border-transparent"
      }`}
    >
      <div className="w-10 h-10 rounded bg-superweld-bg/10 flex items-center justify-center shrink-0 overflow-hidden">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
        ) : (
          <Package className="w-4 h-4 text-superweld-text/30" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium truncate ${isActive ? "text-superweld-orange" : "text-superweld-text"}`}>
          {product.name}
        </p>
        <p className="text-xs text-superweld-textMuted truncate">{product.subCategory}</p>
      </div>
    </Link>
  );
}

export function CategoryDetailClient({ category, allCategories }: CategoryDetailClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [openFilters, setOpenFilters] = useState({ subCategory: true, brand: true, variant: true });
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Extract unique filter values from current category products
  const subCategories = useMemo(() => getUniqueValues(category.products, "subCategory"), [category.products]);
  const brands = useMemo(() => getUniqueValues(category.products, "brand"), [category.products]);
  const variants = useMemo(() => getUniqueValues(category.products, "variant"), [category.products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return category.products.filter((product) => {
      const matchesSearch = searchQuery === "" ||
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory as string);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand as string);
      const matchesVariant = selectedVariants.length === 0 || selectedVariants.includes(product.variant as string);

      return matchesSearch && matchesSubCategory && matchesBrand && matchesVariant;
    });
  }, [category.products, searchQuery, selectedSubCategories, selectedBrands, selectedVariants]);

  // Scroll to product
  const scrollToProduct = (productId: string) => {
    setActiveProductId(productId);
    const element = productRefs.current[productId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Toggle filter
  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSubCategories([]);
    setSelectedBrands([]);
    setSelectedVariants([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedSubCategories.length > 0 || selectedBrands.length > 0 || selectedVariants.length > 0 || searchQuery !== "";

  return (
    <>
      {/* B2B Catalog Header */}
      <section className="py-6 lg:py-8 bg-superweld-light border-b border-superweld-border">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-superweld-textMuted mb-4"
            >
              <Link href="/products" className="hover:text-superweld-text transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-superweld-text">{category.name}</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-superweld-text mb-2">
                  {category.name}
                </h1>
                <p className="text-superweld-textMuted max-w-2xl text-sm">
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
                  <p className="text-xl font-bold text-superweld-orange">{filteredProducts.length}</p>
                  <p className="text-xs text-superweld-textMuted">of {category.products.length} Products</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-superweld-text">B2B</p>
                  <p className="text-xs text-superweld-textMuted">Wholesale</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-6 lg:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Sidebar - Filters & Product Navigation */}
              <aside className="lg:w-80 shrink-0 space-y-4">
                
                {/* Search */}
                <div className="bg-superweld-light border border-superweld-border rounded-xl p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-superweld-text/40" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text text-sm placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-orange"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-4 h-4 text-superweld-text/40 hover:text-superweld-text" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Hierarchical Filters - Category > Sub-category > Brand */}
                <div className="bg-superweld-light border border-superweld-border rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-superweld-border">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-superweld-orange" />
                      <span className="font-semibold text-superweld-text">All Categories</span>
                    </div>
                    <span className="text-xs text-superweld-textMuted bg-superweld-bg/10 px-2 py-1 rounded">
                      {allCategories.filter(c => ["abrasive", "welding-electrodes", "oxy-fuel", "welding-mig-wire", "welding-tig-wire", "welding-consumables"].includes(c.slug)).reduce((acc, cat) => acc + cat.products.length, 0)} products
                    </span>
                  </div>
                  <div className="p-2 max-h-[500px] overflow-y-auto">
                    <CategoryTree allCategories={allCategories.filter(c => ["abrasive", "welding-electrodes", "oxy-fuel", "welding-mig-wire", "welding-tig-wire", "welding-consumables"].includes(c.slug))} currentCategoryId={category.id} />
                  </div>
                </div>

                {/* All Products - From 6 Main Categories */}
                <div className="bg-superweld-light border border-superweld-border rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-superweld-border">
                    <span className="font-semibold text-superweld-text">All Products</span>
                    <p className="text-xs text-superweld-textMuted mt-1">Browse products from 6 main categories</p>
                  </div>
                  <div className="p-2 max-h-80 overflow-y-auto">
                    <div className="space-y-4">
                      {allCategories.filter(c => ["abrasive", "welding-electrodes", "oxy-fuel", "welding-mig-wire", "welding-tig-wire", "welding-consumables"].includes(c.slug)).map((cat) => (
                        <div key={cat.id}>
                          <Link
                            href={`/products/${cat.slug}`}
                            className={`block px-2 py-1.5 text-xs font-semibold rounded transition-colors ${
                              cat.id === category.id
                                ? "bg-superweld-orange/20 text-superweld-orange"
                                : "text-superweld-textMuted hover:text-superweld-text"
                            }`}
                          >
                            {cat.name} ({cat.products.length})
                          </Link>
                          <div className="mt-1 space-y-1 pl-2">
                            {cat.products.slice(0, 3).map((product) => (
                              <ProductListItem
                                key={product.id}
                                product={product}
                                categorySlug={cat.slug}
                                isActive={activeProductId === product.id && cat.id === category.id}
                                onClick={() => {}}
                              />
                            ))}
                            {cat.products.length > 3 && (
                              <Link
                                href={`/products/${cat.slug}`}
                                className="block px-2 py-1 text-xs text-superweld-textMuted hover:text-superweld-orange transition-colors"
                              >
                                + {cat.products.length - 3} more products →
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content - Products Grid */}
              <main className="flex-1 min-w-0">
                {filteredProducts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        ref={(el) => { productRefs.current[product.id as string] = el; }}
                        id={`product-${product.id}`}
                      >
                        <ProductGridCard
                          product={product}
                          categorySlug={category.slug}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-superweld-light border border-superweld-border rounded-xl">
                    <Package className="w-16 h-16 text-superweld-text/20 mx-auto mb-4" />
                    <p className="text-superweld-textMuted text-lg mb-2">No products match your filters.</p>
                    <button
                      onClick={clearFilters}
                      className="text-superweld-orange hover:text-superweld-orangeHover transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </main>
            </div>
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
    </>
  );
}



