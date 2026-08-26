"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

// Browser-only favourites — no accounts, no server. A visitor's saved places
// live in this browser's localStorage under BV_FAVOURITES_KEY. That means
// favourites don't follow someone to a new device or browser (a deliberate
// trade-off — see the chat thread this was scoped in), but it also means
// there's no login flow, no database, and nothing to keep secure.

const BV_FAVOURITES_KEY = "bv-favourites";

interface FavouritesContextValue {
  favourites: string[]; // place slugs
  isFavourite: (slug: string) => boolean;
  toggleFavourite: (slug: string) => void;
  hydrated: boolean; // false until localStorage has been read client-side
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

function readStoredFavourites(): string[] {
  try {
    const raw = window.localStorage.getItem(BV_FAVOURITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    // Private browsing, storage disabled, corrupted value — fail to an empty
    // list rather than breaking the page.
    return [];
  }
}

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Read localStorage only after mount — reading it during render would
  // mismatch between the server-rendered HTML (which has no localStorage)
  // and the client's first render, which React/Next would flag as a
  // hydration error.
  useEffect(() => {
    setFavourites(readStoredFavourites());
    setHydrated(true);
  }, []);

  const toggleFavourite = useCallback((slug: string) => {
    setFavourites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        window.localStorage.setItem(BV_FAVOURITES_KEY, JSON.stringify(next));
      } catch {
        // Storage full or disabled — the toggle still works for this page
        // view, it just won't persist across a reload.
      }
      return next;
    });
  }, []);

  const isFavourite = useCallback((slug: string) => favourites.includes(slug), [favourites]);

  const value = useMemo(
    () => ({ favourites, isFavourite, toggleFavourite, hydrated }),
    [favourites, isFavourite, toggleFavourite, hydrated]
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within a FavouritesProvider");
  return ctx;
}
