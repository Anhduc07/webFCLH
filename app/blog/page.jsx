import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";

async function getClubData() {
  const filePath = path.join(process.cwd(), "data", "database.json");
  const file = await readFile(filePath, "utf8");
  return JSON.parse(file);
}

export default async function BlogPage() {
  const data = await getClubData();
  const posts = data.blog || [];

  return (
    <main style={{ minHeight: "100vh", background: "#f6f1df", color: "#07111f" }}>
      <section
        style={{
          minHeight: 420,
          background:
            "linear-gradient(90deg, rgba(4,18,39,.92), rgba(160,0,50,.75)), url('/images/clothing/2018.png') center/cover",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ width: "min(1100px, calc(100% - 48px))", margin: "0 auto", padding: "90px 0", color: "white" }}>
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: ".35em", color: "#f3b51b", textTransform: "uppercase" }}>
            FC LH Stories
          </p>
          <h1 style={{ fontSize: 86, lineHeight: .9, letterSpacing: "-.06em", margin: "18px 0 0", maxWidth: 850 }}>
            Blog cầu thủ FC LH
          </h1>
          <p style={{ marginTop: 24, maxWidth: 620, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,.78)" }}>
            Những câu chuyện hậu trường, chân dung cầu thủ, chuyển nhượng và các khoảnh khắc đáng nhớ của đội bóng.
          </p>
        </div>
      </section>

      <section style={{ width: "min(1100px, calc(100% - 48px))", margin: "0 auto", padding: "80px 0 120px" }}>
        <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: ".35em", color: "#b00036", textTransform: "uppercase" }}>
          Club Blog
        </p>
        <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-.05em", margin: "16px 0 0" }}>
          Bài viết mới nhất
        </h2>

        <div style={{ marginTop: 42, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 28 }}>
          {posts.map((post, index) => (
            <article
              key={index}
              style={{
                position: "relative",
                minHeight: 300,
                padding: 34,
                borderRadius: 30,
                background: "white",
                boxShadow: "0 24px 70px rgba(7,17,31,.14)",
                overflow: "hidden",
              }}
            >
              <div style={{ height: 8, background: "linear-gradient(90deg, #003b79, #b00036)", position: "absolute", top: 0, left: 0, right: 0 }} />
              <div style={{ fontSize: 56, fontWeight: 950, color: "rgba(7,17,31,.06)", position: "absolute", right: 24, top: 18 }}>
                {String(index + 1).padStart(2, "0")}
              </div>

              <p style={{ fontSize: 13, fontWeight: 900, color: "#b00036", margin: "0 0 18px" }}>{post.year}</p>
              <h3 style={{ maxWidth: "80%", fontSize: 32, lineHeight: 1.05, letterSpacing: "-.04em", margin: 0 }}>
                {post.title}
              </h3>
              <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.75, color: "#526071" }}>{post.text}</p>
             <Link href={`/blog/${post.slug}`}
                    style={{
                        display: "inline-block",
                        marginTop: 26,
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#003b79",
                        textDecoration: "none",
                    }}> Đọc bài viết →
                    </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}