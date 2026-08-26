import { Route } from "@/lib/types";
import { PracticalPill } from "./Badges";

export function RouteTeaser({ route, backgroundImage }: { route: Route; backgroundImage?: string }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid var(--bv-border-subtle)",
        padding: 24,
        minHeight: 234,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        color: "var(--bv-text-on-inverse)",
      }}
    >
      {backgroundImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backgroundImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(13,12,10,0.55)" }} />
        </>
      )}
      <div style={{ position: "relative" }}>
        <div style={{ marginBottom: 12 }}>
          <PracticalPill label="Route" />
        </div>
        <div style={{ fontFamily: "Cooper Black, IBM Plex Mono, monospace", fontSize: 22, marginBottom: 8 }}>{route.title}</div>
        <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 16 }}>{route.note}</p>
        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.25)", marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 24, fontSize: 12, opacity: 0.9 }}>
          <span>● {route.stops} Stops</span>
          <span>● {route.minutes} Mins</span>
        </div>
      </div>
    </div>
  );
}
