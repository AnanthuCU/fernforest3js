import type { Product, Plan } from "@/types";

export const VARIETIES: Product[] = [
  {
    id: "radish",
    name: "Radish",
    slug: "radish",
    category: "variety",
    latinName: "Raphanus sativus",
    description:
      "A detox powerhouse with a peppery punch. Available in White, China Rose, and Purple varieties.",
    benefits: [
      "Fat Loss & Detox",
      "Boosts metabolism",
      "Supports digestion",
      "High in Vitamin C",
    ],
    sizes: [
      { label: "40g", price: 75 },
      { label: "80g", price: 140 },
    ],
    image:
      "https://images.unsplash.com/photo-1614515993243-6a2f7e3db42a?w=600&q=80",
    badge: "Detox",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    slug: "sunflower",
    category: "variety",
    latinName: "Helianthus annuus",
    description:
      "Dense in plant protein and packed with Vitamin E — the ultimate muscle recovery microgreen.",
    benefits: [
      "Muscle Recovery Booster",
      "Natural plant protein",
      "Zinc for testosterone support",
      "Vitamin E for recovery",
    ],
    sizes: [
      { label: "40g", price: 110 },
      { label: "80g", price: 220 },
    ],
    image:
      "https://images.unsplash.com/photo-1566305977571-5666dc0e7bf2?w=600&q=80",
    badge: "Protein",
  },
  {
    id: "amaranthus",
    name: "Amaranthus",
    slug: "amaranthus",
    category: "variety",
    latinName: "Amaranthus",
    description:
      "Rich in iron and antioxidants. Available in Green and Red Garnet varieties for superior oxygen delivery.",
    benefits: [
      "High Iron",
      "Better oxygen delivery",
      "Antioxidant rich",
      "Supports nitric oxide",
    ],
    sizes: [
      { label: "40g", price: 75 },
      { label: "80g", price: 150 },
    ],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    badge: "Iron-Rich",
  },
  {
    id: "beetroot",
    name: "Beetroot",
    slug: "beetroot",
    category: "variety",
    latinName: "Beta vulgaris",
    description:
      "A natural nitric oxide booster that improves blood flow and enhances endurance.",
    benefits: [
      "Supports nitric oxide",
      "Improves blood flow",
      "Enhances endurance",
      "Pre-workout boost",
    ],
    sizes: [
      { label: "40g", price: 190 },
      { label: "80g", price: 360 },
    ],
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&q=80",
    badge: "Endurance",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    slug: "broccoli",
    category: "variety",
    latinName: "Brassica oleracea",
    description:
      "One of the most antioxidant-dense microgreens. Anti-inflammatory and excellent for recovery.",
    benefits: [
      "Anti-Inflammatory Support",
      "Rich in antioxidants",
      "Supports recovery",
      "Aids detox",
    ],
    sizes: [
      { label: "40g", price: 220 },
      { label: "80g", price: 390 },
    ],
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
    badge: "Anti-Inflam.",
  },
  {
    id: "bok-choy",
    name: "Bok Choy",
    slug: "bok-choy",
    category: "variety",
    latinName: "Brassica rapa",
    description:
      "Joint and mineral support powerhouse — rich in Calcium and Magnesium for bone strength.",
    benefits: [
      "Joint & Mineral Support",
      "Calcium & Magnesium",
      "Bone strength",
      "Recovery support",
    ],
    sizes: [
      { label: "40g", price: 140 },
      { label: "80g", price: 270 },
    ],
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    badge: "Joints",
  },
  {
    id: "basil",
    name: "Basil",
    slug: "basil",
    category: "variety",
    latinName: "Ocimum basilicum",
    description:
      "Aromatic and medicinal — ideal for stress relief, cortisol regulation, and digestive harmony.",
    benefits: [
      "Stress & Cortisol Support",
      "Supports stress regulation",
      "Anti-inflammatory",
      "Digestive support",
    ],
    sizes: [
      { label: "40g", price: 190 },
      { label: "80g", price: 300 },
    ],
    image:
      "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&q=80",
    badge: "Stress Relief",
  },
];

export const MIXES: Product[] = [
  {
    id: "fat-loss-mix",
    name: "Fat Loss Mix",
    slug: "fat-loss-mix",
    category: "mix",
    description:
      "Radish + Broccoli + Bok Choy. Targets metabolism, detox, and gut reset for visible fat loss.",
    benefits: ["Metabolism boost", "Detox", "Gut Reset"],
    sizes: [
      { label: "40g", price: 130 },
      { label: "80g", price: 240 },
    ],
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    badge: "Fat Loss",
  },
  {
    id: "muscle-recovery-mix",
    name: "Muscle Recovery Mix",
    slug: "muscle-recovery-mix",
    category: "mix",
    description:
      "Sunflower + Amaranthus. Rich in plant protein with an iron recovery blend for post-workout.",
    benefits: ["Rich in Protein", "Iron Recovery Blend"],
    sizes: [
      { label: "40g", price: 125 },
      { label: "80g", price: 240 },
    ],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    badge: "Recovery",
  },
  {
    id: "pump-performance-mix",
    name: "Pump & Performance Mix",
    slug: "pump-performance-mix",
    category: "mix",
    description:
      "Beetroot + Radish + Amaranthus. Pre-workout boost with blood-flow increment for peak performance.",
    benefits: ["Pre-Workout Boost", "Blood-flow increment"],
    sizes: [
      { label: "40g", price: 150 },
      { label: "80g", price: 280 },
    ],
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&q=80",
    badge: "Performance",
  },
  {
    id: "stress-hormone-mix",
    name: "Stress & Hormone Balance",
    slug: "stress-hormone-mix",
    category: "mix",
    description:
      "Basil + Sunflower + Bok Choy. Supports recovery and hormone balance for mental clarity.",
    benefits: ["Recovery", "Hormone Support"],
    sizes: [
      { label: "40g", price: 140 },
      { label: "80g", price: 260 },
    ],
    image:
      "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&q=80",
    badge: "Hormones",
  },
  {
    id: "elite-performance-mix",
    name: "All-in-One Performance Mix",
    slug: "elite-performance-mix",
    category: "mix",
    description:
      "Sunflower + Radish + Amaranthus + Broccoli + Beetroot. Daily performance and complete nutrition.",
    benefits: ["Daily Performance", "Complete Nutrition"],
    sizes: [
      { label: "40g", price: 170 },
      { label: "80g", price: 320 },
    ],
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
    badge: "Elite",
    featured: true,
  },
];

export const PLANS: Plan[] = [
  {
    id: "starter-plan",
    name: "Starter Plan",
    slug: "starter-plan",
    category: "plan",
    forWhom: "New Gym Members",
    description:
      "The perfect entry point. Build your nutrition habits with two targeted mixes delivered weekly.",
    price: 480,
    frequency: "1 × 40g mix/week",
    includes: ["Fat Loss Mix", "Muscle Recovery Mix"],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "transformation-plan",
    name: "Transformation Plan",
    slug: "transformation-plan",
    category: "plan",
    forWhom: "Regular Gym Members",
    description:
      "Our most trusted plan. Step up to 80g servings with the performance mix for serious results.",
    price: 950,
    frequency: "1 × 80g mix/week",
    includes: ["Pump & Performance Mix"],
    featured: true,
    image:
      "https://images.unsplash.com/photo-1566305977571-5666dc0e7bf2?w=600&q=80",
  },
  {
    id: "preworkout-plan",
    name: "Pre-Workout Booster Plan",
    slug: "preworkout-plan",
    category: "plan",
    forWhom: "Better Pump & Endurance",
    description:
      "Targeted pre-workout nutrition to maximize your pump and endurance every session.",
    price: 550,
    frequency: "1 × 40g mix/week",
    includes: ["Pump & Performance Mix"],
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&q=80",
  },
  {
    id: "performance-pro-plan",
    name: "Performance Pro Plan",
    slug: "performance-pro-plan",
    category: "plan",
    forWhom: "High Performance Athletes",
    description:
      "Premium dual-mix plan for athletes who demand both recovery and peak output.",
    price: 1950,
    frequency: "2 × 80g mix/week",
    includes: ["Muscle Recovery Mix", "Pump & Performance Mix"],
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
  },
  {
    id: "fat-loss-reset-plan",
    name: "Fat Loss Reset Plan",
    slug: "fat-loss-reset-plan",
    category: "plan",
    forWhom: "8-week Transformation",
    description:
      "An 8-week structured plan focused entirely on fat loss, detox, and gut reset.",
    price: 900,
    frequency: "1 × 80g mix/week",
    includes: ["Fat Loss Mix"],
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
  },
  {
    id: "allinone-elite-plan",
    name: "All-in-One Elite Plan",
    slug: "allinone-elite-plan",
    category: "plan",
    forWhom: "Working, Corporate Professionals",
    description:
      "Complete daily nutrition in one blend — the busy professional's shortcut to peak health.",
    price: 1150,
    frequency: "1 × 80g mix/week",
    includes: ["All-in-One Performance Mix"],
    image:
      "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&q=80",
  },
];

export const ALL_PRODUCTS = [...VARIETIES, ...MIXES];

export const WHATSAPP_NUMBER = "918113998511";
