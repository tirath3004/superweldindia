import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/sections";
import { INDUSTRIES, PRODUCT_CATEGORIES } from "@/types/products";
import { ArrowLeft, Package, ArrowRight } from "lucide-react";

// Generate static params for all industries
export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    industryId: industry.id,
  }));
}

// Helper function to get products related to an industry
function getIndustryProducts(industryId: string) {
  // Map industries to relevant product categories
  const industryToCategories: Record<string, string[]> = {
    construction: ["cutting-grinding-wheels", "construction-products", "abrasive"],
    infrastructure: ["cutting-grinding-wheels", "welding-mig-wire", "welding-tig-wire"],
    fabrication: ["welding-mig-wire", "welding-tig-wire", "oxy-fuel-products", "cutting-grinding-wheels"],
    manufacturing: ["welding-mig-wire", "welding-tig-wire", "cutting-grinding-wheels", "coated-abrasives"],
    engineering: ["welding-tig-wire", "welding-mig-wire", "oxy-fuel-products", "non-woven-abrasives"],
    energy: ["welding-mig-wire", "welding-tig-wire", "cutting-grinding-wheels", "welding-electrodes"],
    automotive: ["welding-mig-wire", "welding-tig-wire", "coated-abrasives", "cutting-grinding-wheels"],
  };

  const categoryIds = industryToCategories[industryId] || [];
  const products: typeof PRODUCT_CATEGORIES[0]["products"] = [];

  categoryIds.forEach((catId) => {
    const category = PRODUCT_CATEGORIES.find((c) => c.id === catId);
    if (category && category.products) {
      // Get up to 4 products per category
      products.push(...category.products.slice(0, 4));
    }
  });

  return products.slice(0, 8); // Limit total products
}

// Industry hero images mapping
const industryHeroImages: Record<string, string> = {
  construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  infrastructure: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  fabrication: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
  manufacturing: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80",
  engineering: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80",
  energy: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80",
  automotive: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80",
};

export default async function IndustryPage({ params }: { params: Promise<{ industryId: string }> }) {
  const { industryId } = await params;
  const industry = INDUSTRIES.find((i) => i.id === industryId);

  if (!industry) {
    notFound();
  }

  const products = getIndustryProducts(industry.id);
  const heroImage = industryHeroImages[industryId] || industryHeroImages.construction;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={industry.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Industries
              </Link>
            </div>

            <div>
              <span className="text-superweld-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Industry Solutions
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {industry.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                {industry.description}
              </p>
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-superweld-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Recommended Products
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Products for {industry.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our specialized product range designed specifically for {industry.name.toLowerCase()} applications
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="group"
                  >
                    <Link
                      href={`/products/${product.categoryId}/${product.id}`}
                      className="block bg-white border border-[#EDEDED] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-gray-50 p-4">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.images?.[0] || "/images/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-superweld-primary font-medium mb-1">
                          {product.subCategory || product.categoryId}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-superweld-primary transition-colors mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Products coming soon for this industry.</p>
              </div>
            )}

            {/* View All Products CTA */}
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-superweld-primary text-white font-semibold rounded-lg hover:bg-superweld-primaryHover transition-all duration-300 shadow-lg"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="py-20 lg:py-32 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Explore Other Industries
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {INDUSTRIES.filter((i) => i.id !== industry.id).slice(0, 4).map((otherIndustry, index) => (
                <div
                  key={otherIndustry.id}
                >
                  <Link
                    href={`/industries/${otherIndustry.id}`}
                    className="block bg-white border border-[#EDEDED] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-superweld-primary transition-colors">
                      {otherIndustry.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {otherIndustry.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
