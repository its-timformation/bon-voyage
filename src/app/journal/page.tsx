import { getJournalPosts } from "@/lib/content";
import { JournalTeaser } from "@/components/JournalTeaser";

export default async function JournalIndexPage() {
  const posts = await getJournalPosts();
  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <p className="eyebrow" style={{ marginBottom: 8 }}>From the desk</p>
      <h1 style={{ fontSize: 34, marginBottom: 32 }}>Journal</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {posts.map((post) => (
          <JournalTeaser key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
