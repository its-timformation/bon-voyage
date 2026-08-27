import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FavouritesProvider } from "@/lib/favourites-context";

export const metadata: Metadata = {
  title: "Bon Voyage — Dishing out the authentic advice",
  description:
    "Recommendations and self-guided tours that swap the photo-op crowds for the real places you need to see.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <FavouritesProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </FavouritesProvider>
      </body>
    </html>
  );
}
