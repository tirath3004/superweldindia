import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/sections";
import { ProductDetailClient } from "@/components/sections/product-detail-client";
import { PRODUCT_CATEGORIES, COMPANY_INFO } from "@/types/products";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export async function generateStaticParams() {
  const params: { category: string; productId: string }[] = [];
  
  PRODUCT_CATEGORIES.forEach((category) => {
    category.products.forEach((product) => {
      params.push({
        category: category.slug,
        productId: product.id,
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { category: categorySlug, productId } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);
  const product = category?.products.find((p) => p.id === productId);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | ${category?.name} | Distributed by ${COMPANY_INFO.name}`,
    description: `${product.description} Available through our distribution network.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, productId } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);
  const product = category?.products.find((p) => p.id === productId);
  
  if (!product || !category) {
    notFound();
  }

  const relatedProducts = category.products
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-superweld-bg">
      <Navbar forceLight />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 border-b border-superweld-border">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-superweld-textMuted flex-wrap">
              <Link href="/" className="hover:text-superweld-text transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-superweld-text transition-colors">
                Products
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link 
                href={`/products/${category.slug}`} 
                className="hover:text-superweld-text transition-colors"
              >
                {category.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-superweld-orange">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <ProductDetailClient 
              product={product} 
              category={category} 
              relatedProducts={relatedProducts} 
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
