import Link from "next/link";
import { notFound } from "next/navigation";
import { readSiteData } from "../../../lib/store";

export async function generateStaticParams() {
  const data = await readSiteData();
  return data.blog.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const data = await readSiteData();
  const post = data.blog.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Trang chủ FCLH">
          <span className="crest">F</span>
          <span>{data.club.shortName}</span>
        </Link>
        <nav className="nav-links">
          <Link href="/blog" className="active">Tin tức</Link>
          <Link href="/matches">Lịch đấu</Link>
          <Link href="/players">Đội hình</Link>
        </nav>
      </header>
      <main className="article-page">
        <section className="article-hero">
          <img src={post.image} alt={post.title} />
          <div>
            <p className="eyebrow">{post.category} · {post.year}</p>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        </section>
        <article className="article-body">
          <p>{post.content}</p>
          <Link className="button primary dark" href="/blog">Quay lại tin tức</Link>
        </article>
      </main>
    </>
  );
}
