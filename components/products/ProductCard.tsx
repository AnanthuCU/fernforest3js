"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      category: product.category,
      size: selectedSize.label,
      price: selectedSize.price,
      quantity: 1,
      image: product.image,
    });
    setAdded(true);
    toast.success(`${product.name} (${selectedSize.label}) added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/8 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-parchment">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover product-img-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <div className="absolute top-3 right-3">
            <Badge>{product.badge}</Badge>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">Best Seller</Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-gray-400 italic mb-0.5">{product.latinName}</p>
        <h3 className="font-serif text-xl text-forest mb-2">{product.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1">
          {product.description}
        </p>

        {/* Benefits */}
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {product.benefits.slice(0, 3).map((b) => (
            <li
              key={b}
              className="text-xs bg-cream text-leaf px-2.5 py-1 rounded-full font-medium"
            >
              {b}
            </li>
          ))}
        </ul>

        {/* Size selector */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
            Select Size
          </p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl border-2 text-sm font-semibold transition-all",
                  selectedSize.label === size.label
                    ? "border-sage bg-cream text-forest"
                    : "border-parchment text-gray-500 hover:border-sage/50"
                )}
              >
                <span className="block">{size.label}</span>
                <span className="block text-xs font-normal">
                  {formatPrice(size.price)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200",
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
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
