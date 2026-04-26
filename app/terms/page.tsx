"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B3A3A]/10 rounded-full text-[#8B3A3A] text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Legal Information
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Terms & Conditions
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing and using the services provided by SuperWeld Sources Pvt Ltd, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Company Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    SuperWeld Sources Pvt Ltd is a company registered in India, specializing in the distribution of industrial welding and cutting equipment, tools, and related products. Our registered office is located in India.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Products and Services</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We distribute a wide range of industrial products including but not limited to welding machines, cutting equipment, abrasives, and safety gear. All products are sourced from reputable manufacturers and meet industry quality standards.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
                  <p className="text-gray-600 leading-relaxed">
                    All prices are listed in Indian Rupees (INR) unless otherwise specified. Prices are subject to change without prior notice. Payment terms are as specified in the invoice. We accept various payment methods including bank transfers, checks, and digital payments.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Delivery and Shipping</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We strive to deliver products within the estimated timeframes. However, delivery times may vary based on location and product availability. Shipping costs are calculated based on destination and order size. Risk of loss passes to the buyer upon delivery.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Products may be returned within 30 days of delivery if they are unused, in original packaging, and accompanied by proof of purchase. Defective or damaged products will be replaced or refunded at our discretion. Custom orders and special items may not be eligible for return.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Warranty</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Products come with manufacturer warranties as specified. We facilitate warranty claims but are not responsible for manufacturer defects. Warranty periods vary by product category, typically ranging from 6 months to 2 years.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                  <p className="text-gray-600 leading-relaxed">
                    SuperWeld Sources Pvt Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the purchase price of the products in question.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
                  <p className="text-gray-600 leading-relaxed">
                    All content on our website, including text, images, logos, and product information, is the property of SuperWeld Sources Pvt Ltd or our licensors and is protected by copyright and trademark laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the new terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    For any questions regarding these Terms and Conditions, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 font-semibold">SuperWeld Sources Pvt Ltd</p>
                    <p className="text-gray-600">Email: info@superweldsources.com</p>
                    <p className="text-gray-600">Phone: +91 22-xxx-xxx</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#EDEDED]">
                <p className="text-gray-500 text-sm">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Have Questions?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                If you have any questions about our terms and conditions, feel free to reach out to us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B3A3A] text-white font-semibold rounded-lg hover:bg-[#7A2D2D] transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
