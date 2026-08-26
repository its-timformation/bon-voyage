import { notFound } from "next/navigation";
import { getJournalPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getJournalPosts()).find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64, maxWidth: 720 }}>
      {post.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.heroImage} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 24, aspectRatio: "720/380", objectFit: "cover" }} />
      )}
      <p style={{ fontSize: 12, color: "var(--bv-text-tertiary)", marginBottom: 8 }}>
        {post.city} · {post.date} · {post.readMins} min read
      </p>
      <h1 style={{ fontSize: 30, marginBottom: 24 }}>{post.title}</h1>
      <p style={{ fontSize: 14, color: "var(--bv-text-secondary)", lineHeight: 1.8 }}>
        The full piece for this one hasn&rsquo;t been written yet in this build — this page exists so the
        journal index has somewhere real to link to. When it&rsquo;s ready, it&rsquo;ll read the same way
        every place write-up on this site does: specific, a little wry, and honest about the parts that
        aren&rsquo;t perfect.
      </p>
    </div>
  );
}
