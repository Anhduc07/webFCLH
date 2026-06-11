"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ClubSite({ initialSection = "home", initialData }) {
  const [data, setData] = useState(initialData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const content = data.content;
  const maxGoals = useMemo(() => {
    if (!data?.matches?.length) return 1;
    return Math.max(...data.matches.map((match) => Number(match.goals) || 0), 1);
  }, [data]);

  async function addMatch(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "match",
        opponent: form.get("opponent"),
        homeGoals: form.get("homeGoals"),
        awayGoals: form.get("awayGoals"),
        scorers: form.get("scorers"),
        shots: form.get("shots")
      })
    });

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error || content.runtime.saveError);
      return;
    }

    event.currentTarget.reset();
    setData(result.data);
    setMessage(content.runtime.saveSuccess);
  }

  if (!data) {
    return (
      <main className="loading-screen">
        <span className="crest">F</span>
        <p>Đang tải dữ liệu CLB...</p>
      </main>
    );
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Trang chủ FCLH">
          <span className="crest">F</span>
          <span>{data.club.shortName}</span>
        </Link>
        <button className="nav-toggle" type="button" aria-label="Mở menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Điều hướng chính">
          {content.navigation.map((section) => (
            <Link key={section.id} className={initialSection === section.id ? "active" : ""} href={section.href} onClick={() => setMenuOpen(false)}>
              {section.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        {initialSection === "home" && <Home data={data} content={content.home} />}
        {initialSection !== "home" && <PageHero section={initialSection} copy={content.pageHeroes[initialSection]} />}
        {initialSection === "history" && <History data={data} content={content.history} />}
        {initialSection === "honors" && <Honors items={data.honors} />}
        {initialSection === "players" && <Players items={data.players} />}
        {initialSection === "kits" && <Kits items={data.kits} content={content.kits} />}
        {initialSection === "stats" && <Stats data={data} content={content.stats} maxGoals={maxGoals} onSubmit={addMatch} saving={saving} message={message} />}
        {initialSection === "matches" && <Matches matches={data.matches} />}
        {initialSection === "community" && <Community data={data} />}
        {initialSection === "partners" && <Partners partners={data.partners} />}
        {initialSection === "admin" && <Admin data={data} content={content.stats} onSubmit={addMatch} saving={saving} message={message} />}
        {initialSection === "blog" && <BlogIndex posts={data.blog} />}
      </main>

      <footer className="site-footer">
        <span>{data.club.name}</span>
        <span>{content.runtime.footer}</span>
      </footer>
    </>
  );
}

function Home({ data, content }) {
  const latestPosts = data.blog.slice(0, 3);
  const nextMatch = data.matches.find((match) => match.status === "Next") || data.matches[0];
  const topPlayers = [...data.players].sort((a, b) => Number(b.goals || 0) - Number(a.goals || 0)).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="eyebrow">{data.club.tagline}</p>
          <h1>{data.club.name}</h1>
          <p>{data.club.description}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/players">{content.primaryAction}</Link>
            <Link className="button ghost" href="/matches">{content.secondaryAction}</Link>
          </div>
        </div>
      </section>

      <section className="match-strip" aria-label="Trận đấu gần nhất">
        <div><span className="label">{content.matchLabels.latest}</span><strong>{data.home.latestMatch}</strong></div>
        <div><span className="label">{content.matchLabels.mvp}</span><strong>{data.home.mvp}</strong></div>
        <div><span className="label">{content.matchLabels.next}</span><strong>{data.home.nextMatch}</strong></div>
      </section>

      <section className="section matchday-panel">
        <div>
          <p className="eyebrow">Matchday</p>
          <h2>{nextMatch.opponent}</h2>
          <p>{nextMatch.competition} · {nextMatch.venue} · {nextMatch.date}</p>
        </div>
        <strong>{nextMatch.score}</strong>
        <Link className="button primary dark" href="/matches">Xem match center</Link>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{content.hubEyebrow}</p>
          <h2>{content.hubTitle}</h2>
        </div>
        <div className="feature-grid club-hub-grid">
          <Link className="feature-card blog-card-bg" href="/blog"><span>{content.featureCards.blog}</span></Link>
          <Link className="feature-card matches-card" href="/matches"><span>{content.featureCards.matches}</span></Link>
          <Link className="feature-card players-card" href="/players"><span>{content.featureCards.players}</span></Link>
          <Link className="feature-card kits-card" href="/kits"><span>{content.featureCards.kits}</span></Link>
          <Link className="feature-card community-card" href="/community"><span>{content.featureCards.community}</span></Link>
          <Link className="feature-card partners-card" href="/partners"><span>{content.featureCards.partners}</span></Link>
        </div>
      </section>

      <section className="section news-row">
        <div className="section-heading">
          <p className="eyebrow">Latest news</p>
          <h2>Tin mới từ FC LH</h2>
        </div>
        <div className="news-list">
          {latestPosts.map((post) => (
            <Link key={post.slug} className="news-card" href={`/blog/${post.slug}`}>
              <img src={post.image} alt={post.title} />
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section split-band">
        <div>
          <p className="eyebrow">{content.styleEyebrow}</p>
          <h2>{content.styleTitle}</h2>
          <p>{content.styleText}</p>
        </div>
        <div className="stat-wall">
          <div><strong>{data.home.possession}</strong><span>{content.statLabels.possession}</span></div>
          <div><strong>{data.home.goals}</strong><span>{content.statLabels.goals}</span></div>
          <div><strong>{data.home.unbeaten}</strong><span>{content.statLabels.unbeaten}</span></div>
          <div><strong>{data.home.honors}</strong><span>{content.statLabels.honors}</span></div>
        </div>
      </section>

      <section className="section squad-strip">
        <div className="section-heading">
          <p className="eyebrow">Top scorers</p>
          <h2>Cầu thủ nổi bật</h2>
        </div>
        <div className="mini-player-row">
          {topPlayers.map((player) => (
            <Link key={player.number} href={`/players/${player.number}`} className="mini-player">
              <span>{player.number}</span>
              <strong>{player.name}</strong>
              <small>{player.goals} bàn · {player.assists} kiến tạo</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function PageHero({ section, copy }) {
  if (!copy) return null;
  return (
    <section className={`page-hero ${section}-hero`}>
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
    </section>
  );
}

function BlogIndex({ posts }) {
  const [featured, ...rest] = posts;
  return (
    <section className="section blog-index">
      {featured && (
        <Link className="blog-featured" href={`/blog/${featured.slug}`}>
          <img src={featured.image} alt={featured.title} />
          <div>
            <span>{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.text}</p>
          </div>
        </Link>
      )}
      <div className="blog-grid">
        {rest.map((post) => (
          <Link key={post.slug} className="blog-card" href={`/blog/${post.slug}`}>
            <span className="blog-year">{post.category} · {post.year}</span>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <strong>Đọc bài viết</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

function History({ data, content }) {
  return (
    <section className="content-page">
      <article className="info-panel">
        <h1>{content.introTitle}</h1>
        <p>{data.intro.text}</p>
      </article>
      <div className="timeline">
        {data.history.map((item) => (
          <article key={item.year}>
            <span>{item.year}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Honors({ items }) {
  return (
    <section className="section honors-grid">
      {items.map((item) => (
        <article key={item.id}><span className="trophy">{item.id}</span><h2>{item.title}</h2><p>{item.years}</p></article>
      ))}
    </section>
  );
}

function Players({ items }) {
  return (
    <section className="section player-grid">
      {items.map((player) => (
        <Link key={player.number} href={`/players/${player.number}`} className={`player-card ${player.featured ? "featured" : ""}`}>
          <div className="player-photo">{player.avatar ? <img src={player.avatar} alt={player.name} /> : <span>{player.number}</span>}</div>
          <div>
            <span>{player.number}</span>
            <h2>{player.name}</h2>
            <p>{player.position}</p>
            <strong>{player.stat}</strong>
          </div>
        </Link>
      ))}
    </section>
  );
}

function Kits({ items, content }) {
  return (
    <section className="kits-store">
      <div className="kits-store-body">
        <div className="kits-store-heading">
          <div>
            <p className="eyebrow">{content.title}</p>
            <h2>Bộ sưu tập chính thức</h2>
            <p>{content.note}</p>
          </div>
          <div className="kit-tabs">{content.tabs.map((tab, index) => <span key={tab} className={index === 0 ? "active" : ""}>{tab}</span>)}</div>
        </div>
        <div className="kits-product-row">
          {items.map((kit) => (
            <article key={kit.type} className="kit-product-card">
              <div className="kit-image-wrap">
                {kit.image ? <img src={kit.image} alt={kit.title} /> : <div className="shirt mini-shirt"></div>}
                <span className="kit-badge">{kit.badge}</span>
              </div>
              <div className="kit-product-info">
                <p>FC LH Store</p>
                <h3>{kit.title}</h3>
                <span>{kit.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ data, content, maxGoals, onSubmit, saving, message }) {
  const topPlayers = [...data.players].sort((a, b) => Number(b.goals || 0) - Number(a.goals || 0)).slice(0, 6);
  return (
    <section className="section stats-layout">
      <div className="chart-panel">
        <h2>{content.chartTitle}</h2>
        <div className="bars" aria-label="Biểu đồ bàn thắng">
          {data.matches.slice(0, 5).map((match) => (
            <span key={match.id} style={{ "--value": `${Math.max((match.goals / maxGoals) * 100, 12)}%` }}>
              <b>{match.goals}</b><small>{match.opponent}</small>
            </span>
          ))}
        </div>
      </div>
      <MatchForm content={content} onSubmit={onSubmit} saving={saving} message={message} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Cầu thủ</th><th>Vị trí</th><th>Bàn</th><th>Kiến tạo</th><th>Trận</th></tr></thead>
          <tbody>
            {topPlayers.map((player) => (
              <tr key={player.number}><td>{player.name}</td><td>{player.position}</td><td>{player.goals}</td><td>{player.assists}</td><td>{player.appearances}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Matches({ matches }) {
  return (
    <section className="section match-center">
      {matches.map((match) => (
        <article key={match.id} className={`match-card ${match.status === "Next" ? "next" : ""}`}>
          <div>
            <span>{match.competition}</span>
            <h2>{match.opponent}</h2>
            <p>{match.date} · {match.venue}</p>
          </div>
          <strong>{match.score}</strong>
          <p>{match.scorers}</p>
        </article>
      ))}
    </section>
  );
}

function Community({ data }) {
  return (
    <section className="section community-layout">
      <div className="community-score">
        <span>{data.community.members}</span>
        <strong>members</strong>
        <p>Cộng đồng đang theo dõi các hoạt động FC LH.</p>
      </div>
      <div className="community-actions">
        {data.community.events.map((event) => <article key={event}><h2>{event}</h2><p>Hoạt động dành cho fan và thành viên đội bóng.</p></article>)}
      </div>
    </section>
  );
}

function Partners({ partners }) {
  return (
    <section className="section partners-grid">
      {partners.map((partner) => (
        <article key={partner.name}>
          <span>{partner.type}</span>
          <h2>{partner.name}</h2>
          <p>Đồng hành cùng FC LH trong hành trình phát triển nội dung, thi đấu và cộng đồng.</p>
        </article>
      ))}
    </section>
  );
}

function Admin({ data, content, onSubmit, saving, message }) {
  return (
    <section className="section admin-layout">
      <div className="admin-summary">
        <article><span>{data.players.length}</span><p>Cầu thủ</p></article>
        <article><span>{data.blog.length}</span><p>Tin tức</p></article>
        <article><span>{data.matches.length}</span><p>Trận đấu</p></article>
        <article><span>{data.kits.length}</span><p>Sản phẩm</p></article>
      </div>
      <MatchForm content={content} onSubmit={onSubmit} saving={saving} message={message} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Nhóm</th><th>Trạng thái dữ liệu</th></tr></thead>
          <tbody>
            <tr><td>Club</td><td>{data.club.name} · {data.club.city}</td></tr>
            <tr><td>Next match</td><td>{data.home.nextMatch}</td></tr>
            <tr><td>Latest match</td><td>{data.home.latestMatch}</td></tr>
            <tr><td>Store</td><td>{data.kits.length} sản phẩm đang hiển thị</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MatchForm({ content, onSubmit, saving, message }) {
  return (
    <form className="match-form" onSubmit={onSubmit}>
      <h2>{content.formTitle}</h2>
      <div className="form-grid">
        <label>{content.opponent}<input name="opponent" placeholder="Ví dụ: Dragon FC" required /></label>
        <label>{content.homeGoals}<input name="homeGoals" type="number" min="0" defaultValue="2" required /></label>
        <label>{content.awayGoals}<input name="awayGoals" type="number" min="0" defaultValue="1" required /></label>
        <label>{content.shots}<input name="shots" type="number" min="0" defaultValue="7" required /></label>
      </div>
      <label>{content.scorers}<input name="scorers" placeholder="Mạnh, Tiến, Đức Anh" /></label>
      <button className="button primary dark" disabled={saving}>{saving ? content.saving : content.submit}</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
