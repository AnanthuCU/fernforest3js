"use client";

import Image from "next/image";
import { CheckCircle2, Star, ShoppingCart } from "lucide-react";
import type { Plan } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem({
      productId: plan.id,
      name: plan.name,
      category: "plan",
      size: undefined,
      price: plan.price,
      quantity: 1,
      image: plan.image,
    });
    setAdded(true);
    toast.success(`${plan.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      className={cn(
        "group bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/8 flex flex-col relative",
        plan.featured
          ? "border-gold/50 shadow-lg shadow-gold/10"
          : "border-gray-100 hover:border-sage/30"
      )}
    >
      {plan.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full">
          <Star className="h-3 w-3 fill-white" />
          Most Trusted
        </div>
      )}

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-parchment">
        <Image
          src={plan.image}
          alt={plan.name}
          fill
          className="object-cover product-img-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <p className="text-xs font-bold text-lime uppercase tracking-wider">
            For · {plan.forWhom}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-xl text-forest mb-1">{plan.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {plan.description}
        </p>

        {/* Includes */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
            Includes
          </p>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-sage flex-shrink-0" />
              {plan.frequency}
            </li>
            {plan.includes.map((mix) => (
              <li key={mix} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-sage flex-shrink-0" />
                {mix}
              </li>
            ))}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-parchment">
          <div>
            <span className="font-serif text-2xl text-forest">
              {formatPrice(plan.price)}
            </span>
            <span className="text-sm text-gray-400">/month</span>
          </div>
          <button
            onClick={handleAdd}
            className={cn(
              "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
              added
                ? "bg-sage text-white"
                : "bg-forest text-white hover:bg-leaf active:scale-95"
            )}
          >
            {added ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" /> Subscribe
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
