"use client";

import { useEffect, useState } from "react";
import { FavouriteButton } from "./FavouriteButton";

// Place page image collage (Figma 1303:19863) — plus two behaviours the
// user asked for that the static Figma frame doesn't show at all: the
// images are clickable and expand into a full-screen lightbox, and there's
// a favourite button on the main photo (Figma's Place frame has no
// favourite control anywhere, but it should be possible to favourite a
// place from its own page, not just from a card).
export function PlaceGallery({ images, alt, slug }: { images: string[]; alt: string; slug: string }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (images.length === 0) {
    return <div style={{ aspectRatio: "516/485", background: "var(--bv-bg-wash)", borderRadius: 6 }} />;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {images.map((src, i) => (
          <div key={i} style={{ position: "relative" }}>
            {i === 0 && (
              <div style={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
                <FavouriteButton slug={slug} name={alt} />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} photo ${i + 1}`}
              onClick={() => setOpen(i)}
              style={{ width: "100%", borderRadius: 6, objectFit: "cover", cursor: "zoom-in", display: "block" }}
            />
          </div>
        ))}
      </div>

      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13,12,10,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 32,
            cursor: "zoom-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open]}
            alt={`${alt} photo ${open + 1}`}
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 6 }}
          />
        </div>
      )}
    </>
  );
}
