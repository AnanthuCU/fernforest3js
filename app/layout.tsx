import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Fern Forest – Fresh Microgreens",
  description:
    "Premium hand-harvested microgreens delivered fresh. Shop individual varieties, performance mixes, and goal-oriented subscription plans.",
  keywords: ["microgreens", "fresh", "nutrition", "organic", "Fern Forest"],
  openGraph: {
    title: "Fern Forest – Fresh Microgreens",
    description: "Nature's freshest nutrition, harvested for your well-being.",
    url: "https://fernforest.in",
    siteName: "Fern Forest",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#2D5016",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              borderRadius: "12px",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: { primary: "#B8D96B", secondary: "#2D5016" },
            },
          }}
        />
      </body>
    </html>
  );
}
