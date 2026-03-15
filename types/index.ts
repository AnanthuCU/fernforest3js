export type ProductCategory = "variety" | "mix" | "plan";

export type SizeOption = {
  label: string; // "40g" | "80g"
  price: number;
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  latinName?: string;
  description: string;
  benefits: string[];
  sizes: SizeOption[];
  image: string;
  badge?: string;
  featured?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  category: "plan";
  forWhom: string;
  description: string;
  price: number; // per month
  frequency: string; // "1 x 40g mix/week"
  includes: string[]; // mix names
  featured?: boolean;
  image: string;
}

export interface CartItem {
  productId: string;
  name: string;
  category: ProductCategory;
  size?: string; // "40g" | "80g" — null for plans
  price: number;
  quantity: number;
  image: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}
