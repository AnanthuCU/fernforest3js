# 🌿 Fern Forest — Fresh Microgreens

A production-ready Next.js 14 e-commerce web app for Fern Forest microgreens.

## ✨ Features

- **Full product catalog** — 7 varieties, 5 performance mixes, 6 goal-oriented plans
- **Shopping cart** — persistent via Zustand + localStorage
- **Checkout** → WhatsApp order delivery (no backend needed)
- **Responsive** — mobile-first design
- **Vercel-ready** — zero config deployment

---

## 🚀 Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 🌐 Deploy to Vercel (Step-by-step)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial commit — Fern Forest microgreens app"
git remote add origin https://github.com/YOUR_USERNAME/fernforest.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo `fernforest`
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — that's it!

### Step 3 — Connect `fernforest.in` (GoDaddy → Vercel)

1. In Vercel → your project → **Settings → Domains**
2. Add `fernforest.in` and `www.fernforest.in`
3. Vercel shows you DNS records to add. Copy them.
4. Log into [GoDaddy](https://dcc.godaddy.com) → **DNS → Manage**
5. Add/update these records:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | @    | `76.76.21.21`                |
| CNAME | www  | `cname.vercel-dns.com`       |

6. Wait ~10-30 min for DNS propagation
7. Vercel auto-provisions SSL ✅

---

## 📁 Project Structure

```
fernforest/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, CartDrawer, Toasts)
│   ├── page.tsx            # Homepage (Hero + Varieties + Mixes + Plans)
│   ├── globals.css         # Tailwind + custom styles
│   └── checkout/
│       └── page.tsx        # Checkout form + WhatsApp order
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── cart/
│   │   └── CartDrawer.tsx  # Slide-in cart drawer
│   ├── products/
│   │   ├── ProductCard.tsx # Variety & mix cards with size selector
│   │   └── PlanCard.tsx    # Monthly plan cards
│   └── ui/
│       ├── Button.tsx
│       └── Badge.tsx
├── lib/
│   ├── data.ts             # All products, mixes & plans data
│   ├── store.ts            # Zustand cart state
│   └── utils.ts            # cn(), formatPrice(), WhatsApp URL builder
├── types/
│   └── index.ts            # TypeScript interfaces
├── next.config.ts
├── tailwind.config.ts
├── vercel.json
└── package.json
```

---

## 🛒 Order Flow

1. User browses products → adds to cart
2. Cart drawer opens (persistent across sessions)
3. User goes to `/checkout`, fills name + phone + address
4. Clicks "Place Order via WhatsApp"
5. WhatsApp opens on their device with a **pre-formatted order message** sent to **+91 81139 98511**
6. User hits Send — you receive the order instantly ✅

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Cart state management |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| Vercel | Hosting |

---

## 🎨 Customisation

- **Products/Prices** → Edit `lib/data.ts`
- **WhatsApp number** → Change `WHATSAPP_NUMBER` in `lib/data.ts`
- **Colors** → Edit `tailwind.config.ts` color tokens
- **Fonts** → Edit `app/globals.css` Google Fonts import
