"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import {
  Home,
  Search,
  ChevronDown,
  ChevronRight,
  Filter,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Package,
  CheckSquare,
  Square,
  RotateCcw,
} from "lucide-react";

// Product categories with counts - matching Superweld profile
const filterCategories = [
  { id: "accessories", name: "Accessories and Consumables", count: 15 },
  { id: "cutting", name: "Cutting Automation", count: 17 },
  { id: "filler-metals", name: "Filler Metals", count: 288 },
  { id: "gas-equipment", name: "Gas Equipment", count: 19 },
  { id: "plasma", name: "Manual Plasma Cutting", count: 4 },
  { id: "ppe", name: "PPE / Safety", count: 16 },
  { id: "robotics", name: "Robotics", count: 14 },
  { id: "torches", name: "Torches", count: 5 },
  { id: "welding-auto", name: "Welding Automation", count: 2 },
  { id: "welding-equip", name: "Welding Equipment", count: 32 },
];

// Industrial classes
const industrialClasses = [
  { id: "light", name: "Light Industrial", count: 245 },
  { id: "medium", name: "Medium Industrial", count: 189 },
  { id: "heavy", name: "Heavy Industrial", count: 156 },
];

// Brands
const brands = [
  { id: "superweld", name: "SuperWeld", count: 312 },
  { id: "esab", name: "ESAB", count: 89 },
  { id: "lincoln", name: "Lincoln Electric", count: 67 },
];

// Industry segments
const industrySegments = [
  { id: "construction", name: "Construction", count: 178 },
  { id: "manufacturing", name: "Manufacturing", count: 234 },
  { id: "oil-gas", name: "Oil & Gas", count: 67 },
  { id: "automotive", name: "Automotive", count: 89 },
];

// Mock products data - Superweld products
const allProducts = [
  { id: 1, name: "Mild Steel Welding Electrodes AWS E6013", category: "filler-metals", brand: "superweld", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80", price: "₹850", specs: "2.5mm x 350mm", class: "medium" },
  { id: 2, name: "Stainless Steel TIG Wire ER308L", category: "filler-metals", brand: "superweld", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80", price: "₹2,450", specs: "1.6mm x 5kg", class: "heavy" },
  { id: 3, name: "MIG Welding Wire ER70S-6", category: "filler-metals", brand: "superweld", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80", price: "₹3,200", specs: "0.8mm x 15kg", class: "medium" },
  { id: 4, name: "Oxygen Acetylene Cutting Torch", category: "gas-equipment", brand: "superweld", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80", price: "₹3,850", specs: "Heavy Duty", class: "heavy" },
  { id: 5, name: "Auto-Darkening Welding Helmet", category: "ppe", brand: "superweld", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80", price: "₹4,500", specs: "Shade 9-13", class: "medium" },
  { id: 6, name: "Plasma Cutting Machine 40A", category: "plasma", brand: "esab", image: "https://images.unsplash.com/photo-1577083300638-3c4c0e5f7e3d?w=400&q=80", price: "₹45,000", specs: "40A, 12mm Cut", class: "heavy" },
  { id: 7, name: "SAW Wire EM12K", category: "filler-metals", brand: "superweld", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80", price: "₹5,800", specs: "3.2mm x 25kg", class: "heavy" },
  { id: 8, name: "Cast Iron Welding Electrodes ENi-Cl", category: "filler-metals", brand: "superweld", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80", price: "₹1,250", specs: "3.2mm x 350mm", class: "heavy" },
  { id: 9, name: "Gas Regulator Oxygen", category: "gas-equipment", brand: "superweld", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80", price: "₹1,800", specs: "Single Stage", class: "medium" },
  { id: 10, name: "Welding Cable 1/0 AWG", category: "accessories", brand: "superweld", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80", price: "₹320/m", specs: "Rubber Insulated", class: "medium" },
  { id: 11, name: "TIG Welding Torch WP-26", category: "torches", brand: "superweld", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80", price: "₹2,800", specs: "200A, Air Cooled", class: "medium" },
  { id: 12, name: "Welding Leather Gloves", category: "ppe", brand: "superweld", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80", price: "₹280", specs: "14\" Cowhide", class: "light" },
];

const PRODUCTS_PER_PAGE = 6;

export default function ProductSearchPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setCurrentPage(1);
  };

  const expandAll = () => {
    setExpandedSections(["categories", "industrial", "brands", "industry", "approvals", "standard", "classifications"]);
  };

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    if (selectedFilters.length === 0) return true;
    return (
      selectedFilters.includes(product.category) ||
      selectedFilters.includes(product.class) ||
      selectedFilters.includes(product.brand)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const FilterSection = ({
    title,
    id,
    items,
  }: {
    title: string;
    id: string;
    items: { id: string; name: string; count: number }[];
  }) => (
    <div className="border-t border-superweld-border/30 pt-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full text-left mb-3 hover:text-superweld-orange transition-colors"
      >
        <span className="font-semibold text-superweld-text">{title}</span>
        {expandedSections.includes(id) ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections.includes(id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pb-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleFilter(item.id)}
                  className="flex items-center justify-between w-full group text-left"
                >
                  <div className="flex items-center gap-2">
                    {selectedFilters.includes(item.id) ? (
                      <CheckSquare className="w-4 h-4 text-superweld-orange" />
                    ) : (
                      <Square className="w-4 h-4 text-superweld-textMuted group-hover:text-superweld-orange transition-colors" />
                    )}
                    <span
                      className={`text-sm ${
                        selectedFilters.includes(item.id)
                          ? "text-superweld-orange font-medium"
                          : "text-superweld-textMuted group-hover:text-superweld-text"
                      } transition-colors`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs text-superweld-textMuted/60">
                    ({item.count})
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-superweld-light border-b border-superweld-border/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-superweld-textMuted mb-4">
              <Link href="/" className="hover:text-superweld-orange transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-superweld-orange transition-colors">
                Products & solutions
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-superweld-text">Search</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-superweld-text">
              Search
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-superweld-orange text-superweld-text rounded-full shadow-lg flex items-center justify-center"
              >
                <Filter className="w-6 h-6" />
              </button>

              {/* Sidebar */}
              <aside className={`${sidebarOpen ? "fixed inset-0 z-40 bg-superweld-bg/95 backdrop-blur-sm lg:relative lg:inset-auto lg:bg-transparent lg:backdrop-blur-none" : "hidden lg:block"} lg:w-72 shrink-0`}>
                <div className={`${sidebarOpen ? "absolute top-0 left-0 w-80 h-full" : ""} bg-superweld-bg border border-superweld-border/30 rounded-xl p-5 overflow-y-auto`}>
                  {sidebarOpen && (
                    <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden">
                      <X className="w-6 h-6" />
                    </button>
                  )}

                  {/* Sidebar Header */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-superweld-text mb-4">
                      Filters
                    </h2>
                    <div className="flex items-center gap-3 text-sm">
                      {selectedFilters.length > 0 && (
                        <button onClick={resetFilters} className="text-superweld-orange hover:text-superweld-orangeHover hover:underline">
                          Reset all filters
                        </button>
                      )}
                      <button onClick={expandAll} className="text-superweld-orange hover:text-superweld-orangeHover hover:underline">
                        Expand all
                      </button>
                    </div>
                  </div>

                  {/* Filter Sections */}
                  <FilterSection title="Categories" id="categories" items={filterCategories} />
                  <FilterSection title="Industrial Class" id="industrial" items={industrialClasses} />
                  <FilterSection title="Brands" id="brands" items={brands} />
                  <FilterSection title="Industry segment" id="industry" items={industrySegments} />

                  {/* Additional Filters */}
                  <div className="border-t border-superweld-border/30 pt-4">
                    <button onClick={() => toggleSection("approvals")} className="flex items-center justify-between w-full text-left hover:text-superweld-orange transition-colors">
                      <span className="font-semibold text-superweld-text">Approvals</span>
                      {expandedSections.includes("approvals") ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="border-t border-superweld-border/30 pt-4">
                    <button onClick={() => toggleSection("standard")} className="flex items-center justify-between w-full text-left hover:text-superweld-orange transition-colors">
                      <span className="font-semibold text-superweld-text">Standard</span>
                      {expandedSections.includes("standard") ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="border-t border-superweld-border/30 pt-4">
                    <button onClick={() => toggleSection("classifications")} className="flex items-center justify-between w-full text-left hover:text-superweld-orange transition-colors">
                      <span className="font-semibold text-superweld-text">Classifications</span>
                      {expandedSections.includes("classifications") ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </aside>

              {/* Product Grid */}
              <div className="flex-1 min-w-0">
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-superweld-border/20">
                  <div className="flex items-center gap-4">
                    <p className="text-superweld-textMuted">
                      showing{" "}
                      <span className="font-semibold text-superweld-text">{(currentPage - 1) * PRODUCTS_PER_PAGE + 1}</span>
                      -
                      <span className="font-semibold text-superweld-text">{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)}</span>
                      {" "}of{" "}
                      <span className="font-semibold text-superweld-text">{filteredProducts.length.toLocaleString()}</span>
                      {" "}{filteredProducts.length !== 1 ? "Results" : "Result"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-superweld-textMuted">Sort by:</span>
                    <select className="bg-superweld-bg border border-superweld-border rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-superweld-orange cursor-pointer">
                      <option>Relevance</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Name: A-Z</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid - 2 per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group bg-superweld-bg border border-superweld-border/30 rounded-xl overflow-hidden hover:border-superweld-orange/50 hover:shadow-lg hover:shadow-superweld-orange/5 transition-all duration-300"
                    >
                      <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-4/3 bg-superweld-light overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-superweld-orange text-superweld-text text-xs font-semibold rounded-full">
                              {brands.find((b) => b.id === product.brand)?.name || product.brand}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-superweld-text mb-2 group-hover:text-superweld-orange transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-superweld-textMuted mb-3">{product.specs}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-superweld-orange">{product.price}</span>
                            <span className="text-sm text-superweld-textMuted group-hover:text-superweld-orange transition-colors">View Details</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-superweld-border text-superweld-text hover:border-superweld-orange hover:text-superweld-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-superweld-orange text-superweld-text"
                            : "border border-superweld-border text-superweld-text hover:border-superweld-orange hover:text-superweld-orange"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-superweld-border text-superweld-text hover:border-superweld-orange hover:text-superweld-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* No Results */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <Package className="w-16 h-16 text-superweld-textMuted/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-superweld-text mb-2">No products found</h3>
                    <p className="text-superweld-textMuted mb-4">Try adjusting your filters or search criteria</p>
                    <button onClick={resetFilters} className="px-4 py-2 bg-superweld-orange text-superweld-text rounded-lg hover:bg-superweld-orangeHover transition-colors">
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
