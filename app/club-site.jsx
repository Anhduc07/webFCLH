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
        shots: form.get("shots"),
      }),
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
        <p>{content.runtime.loading}</p>
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
        {initialSection !== "home" && (
          <>
            {!["history", "kits"].includes(initialSection) && <PageHero section={initialSection} copy={content.pageHeroes[initialSection]} />}
            {initialSection === "history" && <History content={content.history} />}
            {initialSection === "honors" && <Honors items={data.honors} />}
            {initialSection === "players" && <Players items={data.players} />}
            {initialSection === "kits" && <Kits items={data.kits} content={content.kits} />}
            {initialSection === "stats" && <Stats data={data} content={content.stats} maxGoals={maxGoals} onSubmit={addMatch} saving={saving} message={message} />}
          </>
        )}
      </main>

      <footer className="site-footer">
        <span>{data.club.name}</span>
        {content.runtime.footer && <span>{content.runtime.footer}</span>}
      </footer>
    </>
  );
}

function Home({ data, content }) {
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
            <Link className="button ghost" href="/history">{content.secondaryAction}</Link>
          </div>
        </div>
      </section>

      <section className="match-strip" aria-label="Trận đấu gần nhất">
        <div><span className="label">{content.matchLabels.latest}</span><strong>{data.home.latestMatch}</strong></div>
        <div><span className="label">{content.matchLabels.mvp}</span><strong>{data.home.mvp}</strong></div>
        <div><span className="label">{content.matchLabels.next}</span><strong>{data.home.nextMatch}</strong></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{content.hubEyebrow}</p>
          <h2>{content.hubTitle}</h2>
        </div>
        <div className="feature-grid">
          <Link className="feature-card history-card" href="/history"><span>{content.featureCards.history}</span></Link>
          <Link className="feature-card honors-card" href="/honors"><span>{content.featureCards.honors}</span></Link>
          <Link className="feature-card kits-card" href="/kits"><span>{content.featureCards.kits}</span></Link>
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
    </>
  );
}

function PageHero({ section, copy }) {
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

function History({ content }) {
  return (
    <section className="content-page">
      <article className="info-panel">
        <h1>{content.introTitle}</h1>
        <p>{content.introText}</p>
      </article>

      <article className="info-panel">
        <h1>{content.achievementTitle}</h1>
        <div className="achievement-list">
          {content.achievements.map((item) => (
            <section key={item.title} className={`achievement-item ${item.accent === "red" ? "accent-red" : "accent-blue"}`}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </section>
          ))}
        </div>
      </article>
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
        <article key={player.number} className={`player-card ${player.featured ? "featured" : ""}`}>
          <div className="player-photo">
            {player.avatar ? <img src={player.avatar} alt={player.name} /> : <span>{player.number}</span>}
          </div>
          <div>
            <span>{player.number}</span>
            <h2>{player.name}</h2>
            <p>{player.position}</p>
            {player.stat && <strong>{player.stat}</strong>}
          </div>
        </article>
      ))}
    </section>
  );
}

function Kits({ items, content }) {
  return (
    <section className="content-page">
      <article className="info-panel">
        <h1>{content.title}</h1>
        <p className="panel-note">{content.note}</p>
        <div className="kit-collection">
          {items.map((kit) => (
            <article key={kit.type} className="kit-tile">
              <div className="kit-thumb">
                {kit.image ? <img src={kit.image} alt={kit.title} /> : <div className="shirt mini-shirt"></div>}
              </div>
              <h2>{kit.title}</h2>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

function Stats({ data, content, maxGoals, onSubmit, saving, message }) {
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

      <form className="match-form" onSubmit={onSubmit}>
        <h2>{content.formTitle}</h2>
        <div className="form-grid">
          <label>{content.opponent}<input name="opponent" placeholder="Ví dụ: Dragon FC" required /></label>
          <label>{content.homeGoals}<input name="homeGoals" type="number" min="0" defaultValue="2" required /></label>
          <label>{content.awayGoals}<input name="awayGoals" type="number" min="0" defaultValue="1" required /></label>
          <label>{content.shots}<input name="shots" type="number" min="0" defaultValue="7" required /></label>
        </div>
        <label>{content.scorers}<input name="scorers" placeholder="Minh Khang, Đức Huy" /></label>
        <button className="button primary dark" disabled={saving}>{saving ? content.saving : content.submit}</button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <div className="table-wrap">
        <table>
          <thead><tr><th>{content.table.match}</th><th>{content.table.scorers}</th><th>{content.table.shots}</th></tr></thead>
          <tbody>
            {data.matches.map((match) => (
              <tr key={match.id}><td>{match.score}</td><td>{match.scorers}</td><td>{match.shots}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
