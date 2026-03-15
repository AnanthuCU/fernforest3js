"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { formatPrice, getWhatsAppURL } from "@/lib/utils";
import type { OrderFormData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageCircle, User, Phone, MapPin, FileText } from "lucide-react";

type FieldError = Partial<Record<keyof OrderFormData, string>>;

function validate(form: OrderFormData): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  if (!form.address.trim()) errors.address = "Delivery address is required";
  return errors;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const url = getWhatsAppURL(items, form);
    window.open(url, "_blank");
    setSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-16 px-4">
        <ShoppingBag className="h-16 w-16 text-parchment" />
        <h1 className="font-serif text-3xl text-forest">Your cart is empty</h1>
        <p className="text-gray-500">Add some microgreens before checking out.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-forest text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-leaf transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-16 px-4 text-center">
        <div className="h-20 w-20 rounded-full bg-lime/20 flex items-center justify-center">
          <MessageCircle className="h-10 w-10 text-sage" />
        </div>
        <h1 className="font-serif text-4xl text-forest">Order Sent! 🌿</h1>
        <p className="text-gray-500 max-w-md">
          Your order details were sent to our WhatsApp. We'll confirm your order
          and arrange fresh delivery shortly.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-forest text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-leaf transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <h1 className="font-serif text-4xl text-forest mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form — left */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-5">
              <h2 className="font-serif text-xl text-forest flex items-center gap-2">
                <User className="h-5 w-5 text-sage" /> Your Details
              </h2>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-bark mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 transition ${
                    errors.name ? "border-red-400 bg-red-50" : "border-parchment bg-cream"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-bark mb-1.5">
                  <Phone className="h-3.5 w-3.5 inline mr-1" />
                  WhatsApp / Phone Number *
                </label>
                <div className="flex">
                  <span className="flex items-center px-4 border border-r-0 border-parchment rounded-l-xl bg-parchment text-sm text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`flex-1 rounded-r-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 transition ${
                      errors.phone ? "border-red-400 bg-red-50" : "border-parchment bg-cream"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-bark mb-1.5">
                  <MapPin className="h-3.5 w-3.5 inline mr-1" />
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Flat No, Building, Street, Area, Bengaluru — PIN"
                  rows={3}
                  className={`w-full rounded-xl border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sage/50 transition ${
                    errors.address ? "border-red-400 bg-red-50" : "border-parchment bg-cream"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-bark mb-1.5">
                  <FileText className="h-3.5 w-3.5 inline mr-1" />
                  Order Notes{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or instructions..."
                  rows={2}
                  className="w-full rounded-xl border border-parchment bg-cream px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sage/50 transition"
                />
              </div>
            </div>

            {/* How it works */}
            <div className="bg-lime/20 rounded-2xl p-5 border border-lime/30">
              <h3 className="text-sm font-bold text-forest mb-2">
                📱 How ordering works
              </h3>
              <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                <li>Fill in your details above and click "Place Order"</li>
                <li>WhatsApp opens with your full order pre-filled</li>
                <li>Simply send the message to us</li>
                <li>We'll confirm and arrange fresh delivery!</li>
              </ol>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white rounded-2xl py-4 font-bold text-base hover:bg-[#1ebe5a] active:scale-95 transition-all"
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.007 22l4.932-1.409C8.341 21.476 10.13 22 11.999 22 17.522 22 22 17.523 22 12S17.522 2 11.999 2zm0 18c-1.71 0-3.305-.48-4.663-1.31l-.334-.198-3.464.99.944-3.558-.217-.347A8 8 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
              </svg>
              Place Order via WhatsApp
            </button>
          </form>

          {/* Order summary — right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-serif text-xl text-forest mb-5 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-sage" /> Order Summary
              </h2>

              <ul className="space-y-4 mb-6">
                {items.map((item) => {
                  const key = `${item.productId}__${item.size ?? "plan"}`;
                  return (
                    <li key={key} className="flex gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden bg-parchment">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-forest truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.size ? `${item.size} × ` : ""}{item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-forest">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-parchment pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-sage font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-parchment">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
