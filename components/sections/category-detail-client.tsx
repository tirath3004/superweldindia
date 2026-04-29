"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import { Package, Search, Filter, ChevronRight, ShoppingCart, X, ChevronDown, Plus, Minus, Building2, Tags, Wrench } from "lucide-react";
import Link from "next/link";
import type { ProductCategory } from "@/types/products";

// Industry segments from the actual website INDUSTRIES data (6 industries)
// Keywords cover all 373 unique typical applications across products
const INDUSTRY_SEGMENTS = [
  { id: "construction", name: "Construction & Infrastructure", keywords: ["Construction", "Building", "Structural", "Projects and construction sites", "TMT bars", "Project sites", "PEB structures", "Channel", "Angle cutting", "Angle iron", "Infrastructure", "Civil works", "Bridges", "Dams", "Power plants", "Pipelines", "Pipeline construction", "Railway", "Metro", "Shipbuilding", "Marine", "Offshore", "Infrastructure work", "Structural fabrication", "Structural welding", "Structural applications", "Unalloyed structural steels", "Build-up welding", "Ship building", "Dredger parts", "Piling rigs", "Water turbines", "Rail crossings", "Rail points and crossings", "Rails", "Surfacing rails", "Pelton wheels", "Wind mill towers", "Hydro power", "Pit casings", "Dam gates", "Penstocks", "Refineries", "Tankers", "Process industry", "Paper mills", "Paper making", "Pulp and paper", "Pulp and paper industry", "Rayon industry", "Sinter plants", "Sinter handling", "Cement kiln", "Cement industry", "Raw mill ducts", "Pipe cutting", "Pipe welding", "Valves", "Valve components", "Pump", "Pump impellers"] },
  { id: "manufacturing", name: "Manufacturing & Fabrication", keywords: ["Manufacturing", "Factory", "Industrial", "Fabrication", "Workshop", "Light fabrication", "Medium fabrication", "Heavy fabrication", "General fabrication", "Sheet metal", "Sheet metal cutting", "Sheet cutting", "Kitchen equipment", "SS furniture", "MS cutting", "Wood sanding", "Wood and plywood cutting", "MDF cutting", "Surface preparation", "SS fabrication", "Stainless steel fabrication", "Small and medium scale fabrication", "Light to medium fabrication", "Medium to heavy fabrication", "SS hinges", "Utensils", "SS polishing", "SS blending and polishing", "Precision cutting", "Thick material cutting", "Thin sheet welding", "Thin plate welding", "Root pass welding", "Single side melt through welding", "Production environments", "Service below 260°C", "Pre- and post-heating", "Marking", "Stampers", "Trimming dies", "Punching tools", "Punches", "Knives", "Machine bodies", "Component building", "Building machinery", "Sugar industry", "Sugar mill rolls", "Steel mills", "Cane knives", "Paper making", "Pulp and paper", "Pharma equipments", "Pharmaceutical equipment", "Bio-fertilizers", "Mixer blades", "Mixer wings", "Mixing paddles", "Screw flights", "Pug mill knives", "Sand mixing blades", "Chain links", "Chain sprockets", "Gears", "Oxyfuel cutting", "Air Plasma cutting", "CNC cutting", "High speed cutting", "Eco-friendly cutting operations", "Heating applications", "Oxygen and LPG heating", "Coated abrasives", "Wood cutting"] },
  { id: "engineering", name: "Engineering & Precision Work", keywords: ["Engineering", "Technical", "Weld removal", "Surface finishing", "Chamfering", "Deburring", "Burr removal", "Grinding", "Surface blending", "Precision work", "Weld blending", "Surface cleaning", "Weld blending and removal", "SS and MS weld blending", "Light weld blending", "Scale removal", "Parting line removal", "Runner/riser grinding", "Back gouging", "Rust removal", "Surface preparation", "Polishing", "Metal scrubbing", "Scrapers", "X-ray quality welds", "Precision cutting", "Professional cutting", "Mechanized cutting", "TIG welding", "MIG welding", "MMA welding", "MIG/MAG welding", "Multi-process", "Multi-process welding", "Semi-automatic welding", "Welding", "Stainless steel welding", "Super duplex steel welding", "Superaustenitic steels", "Martensitic stainless welding", "Duplex welding", "Dissimilar steel welding", "Low alloy steel welding", "Tool steel repair", "Tool steel surfacing", "Toolroom", "Carbide dies", "Hot work tools", "Hot pressing tools", "Boiler tubes", "Boiler tube panels", "Water wall panels", "Creep resistant steels", "High temperature applications", "High temperature service", "High temperature steels", "Turbine blades", "Turbine casings", "Pump impellers", "Valve components", "Boring bars", "Torch end protection", "Flashback prevention", "Regulator end protection", "Oxy-fuel cutting", "Gas cutting torch", "Flashback arrestor"] },
  { id: "mining", name: "Mining & Heavy Industry", keywords: ["Mining", "Mining equipment", "Mining industry", "Mining machinery", "Quarry", "Quarry hoppers", "Ore crushing", "Ore crushing rolls", "Ore-breaker teeth", "Ore-crushing rolls", "Coal crushing", "Coal crusher rolls", "Crusher jaws", "Crusher mantles", "Crushing hammers", "Dredger teeth", "Dredger wear plates", "Dragline buckets", "Shovel cheeks", "Shovel teeth", "Grizzly bars", "Drag chain", "Drag links", "Scraper blades", "Scraper rings", "Ring sectors", "Hot shear blades", "Hot shears", "Hot-shearing blades", "Milling tools", "Cutter teeth", "Cutter drums", "Cutter heads", "Digger teeth", "Ripper teeth", "Cone crushers", "Earth moving", "Earth drilling", "Coal plow bits", "Coal cutter bits", "Auger blades", "Beater bars", "Beater arms", "Slurry pump parts", "Cement industry", "Cement kiln", "Sugar mill rolls", "Sinter plants", "Steel mills", "Rolling mill", "Guide rollers", "Table rollers", "Hot work tools", "Hot pressing tools", "Hot shear blades", "Pallet cars"] },
  { id: "automotive", name: "Automotive & Transportation", keywords: ["Automotive", "Vehicle", "Auto industries", "Car manufacturing", "Transportation", "Vehicle repair", "Body works", "Frame welding", "Cross-country vehicles", "Mobile equipment", "Mobile welding", "Portable applications", "Portable cutting", "On-site work", "Offsite welding", "Remote welding", "Tractor parts", "Tankers", "Transport containers", "Turbine blades", "Turbine casings"] },
  { id: "energy", name: "Energy & Power", keywords: ["Energy", "Power", "Oil", "Gas", "Petrochemical", "Thermal", "Solar", "Renewable energy", "Power generation", "Boiler tubes", "Boiler tube panels", "Water wall panels", "Creep resistant steels", "High temperature applications", "High temperature service", "High temperature steels", "Wind mill towers", "Hydro power", "Penstocks", "Dam gates", "Thermal power", "Nuclear applications", "Thick material cutting", "Anaerobic service", "Water turbines", "Pelton wheels", "Turbine blades", "Turbine casings"] }
];

// All brands in the catalog (extracted from actual products)
const ALL_BRANDS = [
  "Norton",
  "ESAB",
  "ADOR Welding",
  "Messer",
  "Superon India"
];

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
            <h3 className="font-semibold text-superweld-text group-hover:text-superweld-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-superweld-textMuted">{product.subCategory}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-superweld-primary/20 text-superweld-primary text-xs rounded">
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
          className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-primary text-white text-sm font-medium rounded-lg hover:bg-superweld-primaryHover transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          View Details
        </Link>
      </td>
    </motion.tr>
  );
}

function ProductGridCard({ product, categorySlug, categoryName }: { product: any; categorySlug: string; categoryName?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-superweld-light border border-superweld-border rounded-xl overflow-hidden hover:border-superweld-primary/50 transition-all"
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
          <span className="absolute top-3 left-3 px-2 py-1 bg-superweld-primary text-white text-xs font-semibold rounded">
            {product.variant}
          </span>
        </Link>

        {/* Product Info - Right Side */}
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-superweld-textMuted mb-1">
                  {categoryName && <span className="inline-block px-2 py-0.5 bg-superweld-primary/20 text-superweld-primary rounded mr-2">{categoryName}</span>}
                  {product.subCategory} • {product.brand}
                </p>
                <Link href={`/products/${categorySlug}/${product.id}`}>
                  <h3 className="font-semibold text-lg text-superweld-text group-hover:text-superweld-primary transition-colors mb-2">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-superweld-primary text-white text-sm font-medium rounded-lg hover:bg-superweld-primaryHover transition-colors"
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

// Sidebar Section Component with +/- Toggle
function SidebarSection({ title, icon, count, children, defaultOpen = false }: {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-superweld-light border border-superweld-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-superweld-bg/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-superweld-text text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-superweld-textMuted bg-superweld-bg/10 px-2 py-0.5 rounded">
            {count}
          </span>
          {isOpen ? (
            <Minus className="w-4 h-4 text-superweld-textMuted" />
          ) : (
            <Plus className="w-4 h-4 text-superweld-textMuted" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-superweld-border">
          {children}
        </div>
      )}
    </div>
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
                  className="w-4 h-4 rounded border-superweld-border bg-superweld-bg/5 text-superweld-primary focus:ring-superweld-primary"
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
                isCurrentCat ? "bg-superweld-primary/10" : "hover:bg-superweld-bg/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <ChevronDown className={`w-3 h-3 text-superweld-textMuted transition-transform ${isCatExpanded ? "rotate-180" : ""}`} />
                <span className={`text-sm font-medium ${isCurrentCat ? "text-superweld-primary" : "text-superweld-text"}`}>
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
                                className="block py-1 px-2 text-xs text-superweld-textMuted/80 hover:text-superweld-primary transition-colors rounded hover:bg-superweld-bg/5"
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

// Category with Sub-categories Menu Component
function CategoryWithSubMenu({ cat, currentCategoryId, subCats, selectedSubCategories, onSubCategoryClick }: { cat: any; currentCategoryId: string; subCats: string[]; selectedSubCategories: string[]; onSubCategoryClick: (subCat: string) => void }) {
  const [isOpen, setIsOpen] = useState(cat.id === currentCategoryId);
  const isCurrent = cat.id === currentCategoryId;

  return (
    <div className="border border-superweld-border rounded-lg overflow-hidden">
      <Link
        href={`/products/${cat.slug}`}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
          isCurrent
            ? "bg-superweld-primary/10 text-superweld-primary font-medium"
            : "text-superweld-text hover:bg-superweld-bg/5"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>{cat.name}</span>
        </div>
        <span className="text-xs bg-superweld-bg/10 px-2 py-0.5 rounded">
          {cat.products.length}
        </span>
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center py-1 text-superweld-textMuted hover:text-superweld-text hover:bg-superweld-bg/5 transition-colors border-t border-superweld-border"
      >
        {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
      </button>

      {isOpen && (
        <div className="border-t border-superweld-border bg-superweld-bg/5">
          {subCats.map((subCat) => {
            const subCatProducts = cat.products.filter((p: any) => p.subCategory === subCat);
            const isSelected = selectedSubCategories.includes(subCat);
            return (
              <div key={subCat} className="border-b border-superweld-border/50 last:border-b-0">
                <button
                  onClick={() => onSubCategoryClick(subCat)}
                  className={`w-full block px-6 py-2 text-xs transition-colors text-left ${
                    isSelected
                      ? "text-superweld-primary bg-superweld-primary/10 font-medium"
                      : "text-superweld-textMuted hover:text-superweld-text hover:bg-superweld-bg/10"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{subCat}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${isSelected ? "bg-superweld-primary/20" : "bg-superweld-bg/10"}`}>
                      {subCatProducts.length}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}
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
          ? "bg-superweld-primary/20 border border-superweld-primary/50"
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
        <p className={`text-xs font-medium truncate ${isActive ? "text-superweld-primary" : "text-superweld-text"}`}>
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
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [openFilters, setOpenFilters] = useState({ subCategory: true, brand: true, variant: true, industry: true });
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Extract unique filter values from current category products
  const subCategories = useMemo(() => getUniqueValues(category.products, "subCategory"), [category.products]);
  const brands = useMemo(() => getUniqueValues(category.products, "brand"), [category.products]);
  const variants = useMemo(() => getUniqueValues(category.products, "variant"), [category.products]);

  // Determine if we're in cross-category mode (brand or industry selected)
  const isCrossCategoryMode = selectedBrands.length > 0 || selectedIndustry !== null;

  // Filter products
  const filteredProducts = useMemo(() => {
    // If in cross-category mode, collect products from ALL categories
    const productsToFilter = isCrossCategoryMode
      ? allCategories.flatMap(cat => cat.products.map(p => ({ ...p, _categorySlug: cat.slug, _categoryName: cat.name })))
      : category.products.map(p => ({ ...p, _categorySlug: category.slug, _categoryName: category.name }));

    return productsToFilter.filter((product) => {
      const matchesSearch = searchQuery === "" ||
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory as string);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand as string);
      const matchesVariant = selectedVariants.length === 0 || selectedVariants.includes(product.variant as string);

      // Industry matching based on typicalApplications - use word boundary matching for precision
      const matchesIndustry = selectedIndustry === null || (() => {
        const industry = INDUSTRY_SEGMENTS.find(i => i.id === selectedIndustry);
        if (!industry) return false;
        return product.typicalApplications?.some((app: string) => {
          const appLower = app.toLowerCase();
          return industry.keywords.some(keyword => {
            const keywordLower = keyword.toLowerCase();
            // Check for exact match or app starts with keyword + space, or ends with space + keyword
            return appLower === keywordLower ||
                   appLower.startsWith(keywordLower + ' ') ||
                   appLower.endsWith(' ' + keywordLower) ||
                   appLower.includes(' ' + keywordLower + ' ');
          });
        });
      })();

      return matchesSearch && matchesSubCategory && matchesBrand && matchesVariant && matchesIndustry;
    });
  }, [category.products, category.slug, category.name, allCategories, searchQuery, selectedSubCategories, selectedBrands, selectedVariants, selectedIndustry, isCrossCategoryMode]);

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
    setSelectedIndustry(null);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedSubCategories.length > 0 || selectedBrands.length > 0 || selectedVariants.length > 0 || selectedIndustry !== null || searchQuery !== "";

  return (
    <>
      {/* B2B Catalog Header */}
      <section className="py-6 lg:py-8 bg-superweld-light border-b border-superweld-border">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-superweld-text mb-2">
                  {selectedBrands.length > 0
                    ? `${selectedBrands[0]} Products`
                    : selectedIndustry
                    ? `${INDUSTRY_SEGMENTS.find(i => i.id === selectedIndustry)?.name} Products`
                    : category.name}
                </h1>
                <p className="text-superweld-textMuted max-w-2xl text-sm">
                  {selectedBrands.length > 0
                    ? `All products from ${selectedBrands[0]} brand across all categories.`
                    : selectedIndustry
                    ? `All products for ${INDUSTRY_SEGMENTS.find(i => i.id === selectedIndustry)?.name} industry across all categories.`
                    : category.description}
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
                  <p className="text-xl font-bold text-superweld-primary">{filteredProducts.length}</p>
                  <p className="text-xs text-superweld-textMuted">
                    {isCrossCategoryMode ? "Products Found" : `of ${category.products.length} Products`}
                  </p>
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
                      className="w-full pl-10 pr-8 py-2 bg-superweld-bg/5 border border-superweld-border rounded-lg text-superweld-text text-sm placeholder:text-superweld-text/40 focus:outline-none focus:border-superweld-primary"
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

                {/* 1. ALL Categories with +/- Toggle */}
                <SidebarSection
                  title="ALL Categories"
                  icon={<Tags className="w-4 h-4 text-superweld-primary" />}
                  count={6}
                  defaultOpen={true}
                >
                  <div className="space-y-1">
                    {allCategories
                      .filter((cat) =>
                        [
                          "abrasive",
                          "welding-electrodes",
                          "oxy-fuel",
                          "welding-mig-wire",
                          "welding-tig-wire",
                          "welding-consumables",
                        ].includes(cat.slug)
                      )
                      .map((cat) => {
                        // Get unique sub-categories for this category
                        const subCats = [
                          ...new Set(cat.products.map((p) => p.subCategory)),
                        ].sort();

                        return (
                          <div key={cat.id} className="mb-2">
                            <CategoryWithSubMenu
                              cat={cat}
                              currentCategoryId={category.id}
                              subCats={subCats}
                              selectedSubCategories={selectedSubCategories}
                              onSubCategoryClick={(subCat) => {
                                if (cat.id === category.id) {
                                  // Same category: toggle filter locally
                                  setSelectedSubCategories(prev =>
                                    prev.includes(subCat) ? [] : [subCat]
                                  );
                                } else {
                                  // Different category: navigate to that category
                                  window.location.href = `/products/${cat.slug}`;
                                }
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </SidebarSection>

                {/* 2. All Brands with +/- Toggle */}
                <SidebarSection
                  title="All Brands"
                  icon={<Wrench className="w-4 h-4 text-superweld-primary" />}
                  count={ALL_BRANDS.length}
                  defaultOpen={false}
                >
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {ALL_BRANDS.map((brand) => {
                      const brandProductCount = allCategories.reduce(
                        (acc, cat) => acc + cat.products.filter(p => p.brand === brand).length,
                        0
                      );
                      if (brandProductCount === 0) return null;
                      return (
                        <button
                          key={brand}
                          onClick={() => {
                            // Toggle brand selection
                            const isSelecting = !selectedBrands.includes(brand);
                            setSelectedBrands(prev =>
                              prev.includes(brand) ? [] : [brand]
                            );
                            // When selecting a brand, clear sub-categories and variants to avoid conflicts
                            if (isSelecting) {
                              setSelectedSubCategories([]);
                              setSelectedVariants([]);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                            selectedBrands.includes(brand)
                              ? "bg-superweld-primary/20 text-superweld-primary font-medium"
                              : "text-superweld-textMuted hover:text-superweld-text hover:bg-superweld-bg/5"
                          }`}
                        >
                          <span>{brand}</span>
                          <span className="text-xs bg-superweld-bg/10 px-2 py-0.5 rounded">
                            {brandProductCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </SidebarSection>

                {/* 3. Industry Segments with +/- Toggle */}
                <SidebarSection
                  title="Industry Segments"
                  icon={<Building2 className="w-4 h-4 text-superweld-primary" />}
                  count={INDUSTRY_SEGMENTS.length}
                  defaultOpen={false}
                >
                  <div className="space-y-1">
                    {INDUSTRY_SEGMENTS.map((segment) => {
                      const segmentProductCount = allCategories.reduce((acc, cat) => {
                        return acc + cat.products.filter(p =>
                          p.typicalApplications?.some(app => {
                            const appLower = app.toLowerCase();
                            return segment.keywords.some(kw => {
                              const kwLower = kw.toLowerCase();
                              // Word boundary matching for precision
                              return appLower === kwLower ||
                                     appLower.startsWith(kwLower + ' ') ||
                                     appLower.endsWith(' ' + kwLower) ||
                                     appLower.includes(' ' + kwLower + ' ');
                            });
                          })
                        ).length;
                      }, 0);
                      if (segmentProductCount === 0) return null;
                      return (
                        <button
                          key={segment.id}
                          onClick={() => {
                            // Toggle industry selection
                            const isSelecting = selectedIndustry !== segment.id;
                            setSelectedIndustry(prev =>
                              prev === segment.id ? null : segment.id
                            );
                            // When selecting an industry, clear sub-categories and variants to avoid conflicts
                            if (isSelecting) {
                              setSelectedSubCategories([]);
                              setSelectedVariants([]);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                            selectedIndustry === segment.id
                              ? "bg-superweld-primary/20 text-superweld-primary font-medium"
                              : "text-superweld-textMuted hover:text-superweld-text hover:bg-superweld-bg/5"
                          }`}
                        >
                          <span>{segment.name}</span>
                          <span className="text-xs bg-superweld-bg/10 px-2 py-0.5 rounded">
                            {segmentProductCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </SidebarSection>
              </aside>

              {/* Main Content - Products Grid */}
              <main className="flex-1 min-w-0">
                {filteredProducts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={`${product._categorySlug}-${product.id}`}
                        ref={(el) => { productRefs.current[`${product._categorySlug}-${product.id}`] = el; }}
                        id={`product-${product._categorySlug}-${product.id}`}
                      >
                        <ProductGridCard
                          product={product}
                          categorySlug={product._categorySlug || category.slug}
                          categoryName={isCrossCategoryMode ? product._categoryName : undefined}
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
                      className="text-superweld-primary hover:text-superweld-primaryHover transition-colors"
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
            <div className="bg-linear-to-r from-superweld-primary/20 to-transparent border border-superweld-primary/30 rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-superweld-text mb-2">Need Bulk Orders?</h2>
                  <p className="text-superweld-textMuted">Contact us for wholesale pricing and custom orders. We offer competitive B2B rates.</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-superweld-primary text-white font-semibold rounded-xl hover:bg-superweld-primaryHover transition-colors shrink-0"
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



