import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const editorialFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARTISTRYGIGS | Fine Art Atelier & Creative Tech Lab",
  description:
    "Multidisciplinary studio uniting large-scale original canvas art, limited archival prints, custom art commissions, and high-performance full-stack web applications.",
  keywords: [
    "custom art commissions",
    "fine art oil paintings",
    "creative coding",
    "full-stack developer portfolio",
    "gold leaf mixed media",
    "archival giclée prints",
    "Next.js portfolio",
  ],
  authors: [{ name: "ARTISTRYGIGS" }],
  openGraph: {
    title: "ARTISTRYGIGS | Fine Art Atelier & Creative Tech Lab",
    description:
      "Original canvas artworks, limited edition prints, and bespoke software engineering.",
    type: "website",
    locale: "en_US",
    siteName: "ARTISTRYGIGS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${editorialFont.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#08080a] text-neutral-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
