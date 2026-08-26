import Link from "next/link";
import { JournalPost } from "@/lib/types";

export function JournalTeaser({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ position: "relative", aspectRatio: "412 / 240", borderRadius: 5, overflow: "hidden", background: "var(--bv-bg-wash)" }}>
        {post.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.heroImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "var(--bv-text-primary)" }}>{post.title}</div>
      <div style={{ fontSize: 12, color: "var(--bv-text-tertiary)" }}>
        {post.city} · {post.date} · {post.readMins} min read
      </div>
    </Link>
  );
}
