"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  MessageCircle,
  Phone,
  User,
  Mail,
  Package,
  Hash,
  Send,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price?: string;
}

interface ProductRequestFormProps {
  product?: Product;
  onClose?: () => void;
}

const WHATSAPP_NUMBER = "919890663256";

export function ProductRequestForm({ product, onClose }: ProductRequestFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "1",
    message: "",
    preferredContact: "whatsapp" as "whatsapp" | "phone",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      "*Product Inquiry - Superweld*",
      "",
      "*Product Details:*",
      product ? `Product: ${product.name}` : "Product: General Inquiry",
      product?.category ? `Category: ${product.category}` : "",
      `Quantity: ${formData.quantity}`,
      "",
      "*Customer Information:*",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      formData.company ? `Company: ${formData.company}` : "",
      "",
    ];

    if (formData.message) {
      lines.push("*Additional Message:*");
      lines.push(formData.message);
      lines.push("");
    }

    lines.push("Please provide pricing and availability information.");
    lines.push("");
    lines.push("Thank you!");

    return lines.filter(Boolean).join("\n");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Generate WhatsApp message
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
    setIsComplete(true);
  };

  const steps = [
    { number: 1, title: "Your Details", description: "Contact information" },
    { number: 2, title: "Product Info", description: "Quantity & requirements" },
    { number: 3, title: "Review", description: "Confirm & send" },
  ];

  if (isComplete) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-superweld-text mb-2">
          Request Sent!
        </h3>
        <p className="text-superweld-textMuted mb-6">
          Your inquiry has been prepared and WhatsApp is now open. Please send the message to complete your request.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              const message = generateWhatsAppMessage();
              const encodedMessage = encodeURIComponent(message);
              window.open(
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
                "_blank"
              );
            }}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Open WhatsApp Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  step >= s.number
                    ? "bg-superweld-orange text-superweld-text"
                    : "bg-superweld-bg/5 border border-superweld-border text-superweld-textMuted"
                }`}
              >
                {step > s.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  s.number
                )}
              </div>
              <span
                className={`text-xs mt-2 ${
                  step >= s.number
                    ? "text-superweld-orange"
                    : "text-superweld-textMuted"
                }`}
              >
                {s.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  step > s.number ? "bg-superweld-orange" : "bg-superweld-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-superweld-text mb-4">
              Your Contact Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-superweld-text mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-superweld-textMuted" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg focus:outline-hidden focus:border-superweld-orange transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-superweld-text mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-superweld-textMuted" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg focus:outline-hidden focus:border-superweld-orange transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-superweld-text mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-superweld-textMuted" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg focus:outline-hidden focus:border-superweld-orange transition-colors"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-superweld-text mb-2">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg focus:outline-hidden focus:border-superweld-orange transition-colors"
                placeholder="Enter your company name"
              />
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-superweld-text mb-3">
                Preferred Contact Method
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => updateField("preferredContact", "whatsapp")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                    formData.preferredContact === "whatsapp"
                      ? "border-green-500 bg-green-500/10 text-green-500"
                      : "border-superweld-border text-superweld-textMuted hover:border-superweld-orange"
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => updateField("preferredContact", "phone")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                    formData.preferredContact === "phone"
                      ? "border-superweld-orange bg-superweld-orange/10 text-superweld-orange"
                      : "border-superweld-border text-superweld-textMuted hover:border-superweld-orange"
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  Phone Call
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-superweld-text mb-4">
              Product Information
            </h3>

            {product && (
              <div className="p-4 bg-superweld-orange/5 border border-superweld-orange/20 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-superweld-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-superweld-text">
                      {product.name}
                    </p>
                    {product.category && (
                      <p className="text-sm text-superweld-textMuted">
                        {product.category}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-superweld-text mb-2">
                Quantity Required *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-superweld-textMuted" />
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => updateField("quantity", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg focus:outline-hidden focus:border-superweld-orange transition-colors"
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-superweld-text mb-2">
                Additional Requirements or Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-superweld-bg/5 border border-superweld-border rounded-lg focus:outline-hidden focus:border-superweld-orange transition-colors resize-none"
                placeholder="Describe any specific requirements, specifications, or questions..."
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-superweld-text mb-4">
              Review Your Request
            </h3>

            <div className="space-y-4 bg-superweld-bg/5 border border-superweld-border rounded-lg p-4">
              <div>
                <p className="text-xs text-superweld-textMuted uppercase tracking-wider mb-1">
                  Contact Information
                </p>
                <p className="font-medium text-superweld-text">{formData.name}</p>
                <p className="text-sm text-superweld-textMuted">{formData.email}</p>
                <p className="text-sm text-superweld-textMuted">{formData.phone}</p>
                {formData.company && (
                  <p className="text-sm text-superweld-textMuted">
                    {formData.company}
                  </p>
                )}
              </div>

              <div className="border-t border-superweld-border/30 pt-4">
                <p className="text-xs text-superweld-textMuted uppercase tracking-wider mb-1">
                  Product Details
                </p>
                {product ? (
                  <>
                    <p className="font-medium text-superweld-text">
                      {product.name}
                    </p>
                    <p className="text-sm text-superweld-textMuted">
                      Quantity: {formData.quantity}
                    </p>
                  </>
                ) : (
                  <p className="text-superweld-text">General Product Inquiry</p>
                )}
              </div>

              {formData.message && (
                <div className="border-t border-superweld-border/30 pt-4">
                  <p className="text-xs text-superweld-textMuted uppercase tracking-wider mb-1">
                    Message
                  </p>
                  <p className="text-sm text-superweld-text">{formData.message}</p>
                </div>
              )}

              <div className="border-t border-superweld-border/30 pt-4">
                <p className="text-xs text-superweld-textMuted uppercase tracking-wider mb-1">
                  Preferred Contact
                </p>
                <div className="flex items-center gap-2">
                  {formData.preferredContact === "whatsapp" ? (
                    <>
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span className="text-superweld-text">WhatsApp</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 text-superweld-orange" />
                      <span className="text-superweld-text">Phone Call</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-superweld-textMuted">
                Your request will be sent via WhatsApp to our sales team. Please
                click "Send Request" to open WhatsApp and send the message.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack} className="flex-1">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {step < 3 ? (
          <Button
            onClick={handleNext}
            className="flex-1 bg-superweld-orange hover:bg-superweld-orangeHover"
            disabled={
              (step === 1 &&
                (!formData.name || !formData.email || !formData.phone)) ||
              (step === 2 && !formData.quantity)
            }
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Opening WhatsApp...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
