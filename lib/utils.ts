import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CartItem, OrderFormData } from "@/types";
import { WHATSAPP_NUMBER } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `₹${price}`;
}

export function buildWhatsAppMessage(
  items: CartItem[],
  form: OrderFormData
): string {
  const lines: string[] = [];

  lines.push(`🌿 *New Order — Fern Forest Microgreens*`);
  lines.push(`━━━━━━━━━━━━━━━━━━`);
  lines.push(`👤 *Customer Details*`);
  lines.push(`Name: ${form.name}`);
  lines.push(`Phone: ${form.phone}`);
  lines.push(`Address: ${form.address}`);
  if (form.notes) lines.push(`Notes: ${form.notes}`);
  lines.push(``);
  lines.push(`🛒 *Order Summary*`);
  lines.push(`━━━━━━━━━━━━━━━━━━`);

  let total = 0;
  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const sizeStr = item.size ? ` (${item.size})` : "";
    lines.push(
      `• ${item.name}${sizeStr} × ${item.quantity} = ₹${itemTotal}`
    );
  });

  lines.push(``);
  lines.push(`💰 *Total: ₹${total}*`);
  lines.push(`━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Sent via fernforest.in_`);

  return encodeURIComponent(lines.join("\n"));
}

export function getWhatsAppURL(items: CartItem[], form: OrderFormData): string {
  const message = buildWhatsAppMessage(items, form);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
