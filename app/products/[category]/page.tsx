import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/sections";
import { CategoryDetailClient } from "@/components/sections/category-detail-client";
import { PRODUCT_CATEGORIES, COMPANY_INFO } from "@/types/products";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);
  
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | Products We Distribute | ${COMPANY_INFO.name}`,
    description: `${category.description} Available through our distribution network.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);
  
  if (!category) {
    notFound();
  }

  const otherCategories = PRODUCT_CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <main className="min-h-screen bg-industrial-black">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-industrial-orange">{category.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <CategoryDetailClient category={category} allCategories={PRODUCT_CATEGORIES} />

      <Footer />
    </main>
  );
}
