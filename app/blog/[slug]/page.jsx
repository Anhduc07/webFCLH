"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";


const sections = [
  { id: "home", label: "Trang chủ", href: "/" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "history", label: "Lịch sử", href: "/history" },
  { id: "honors", label: "Danh hiệu", href: "/honors" },
  { id: "players", label: "Player", href: "/players" },
  { id: "kits", label: "Trang phục", href: "/kits" },
  { id: "stats", label: "Thống kê", href: "/stats" },
];

const pageCopy = {
  history: [
    "Từ một đội bóng nhỏ",
    "Lịch sử hình thành CLB",
    "FCLH được xây dựng quanh tinh thần đoàn kết, bóng đá đẹp và niềm tin rằng mỗi thế hệ cầu thủ đều để lại một dấu ấn riêng.",
  ],
  honors: [
    "Trophy room",
    "Danh hiệu đạt được",
    "Những cột mốc vô địch và giải thưởng cá nhân nổi bật trong hành trình phát triển của CLB.",
  ],
  players: [
    "First team",
    "Danh sách cầu thủ",
    "Đội hình mẫu với số áo, vị trí, vai trò và chỉ số nổi bật.",
  ],
  stats: [
    "Match data",
    "Thống kê bàn thắng các trận",
    "Bảng theo dõi kết quả, cầu thủ ghi bàn và hiệu suất tấn công trong các trận gần đây.",
  ],
};

export default function ClubSite({ initialSection = "home" }) {
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/site", { cache: "no-store" })
      .then((response) => response.json())
      .then(setData)
      .catch(() => setMessage("Không tải được dữ liệu từ backend."));
  }, []);

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
      setMessage(result.error || "Không lưu được trận đấu.");
      return;
    }

    event.currentTarget.reset();
    setData(result.data);
    setMessage("Đã lưu trận mới vào backend JSON.");
  }

  if (!data) {
    return (
      <main className="loading-screen">
        <span className="crest">F</span>
        <p>Đang tải dữ liệu CLB từ backend...</p>
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

        <button
          className="nav-toggle"
          type="button"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Điều hướng chính">
          {sections.map((section) => (
            <Link
              key={section.id}
              className={initialSection === section.id ? "active" : ""}
              href={section.href}
              onClick={() => setMenuOpen(false)}
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        {initialSection === "home" && <Home data={data} />}

        {initialSection === "kits" && <KitsStore items={data.kits || []} />}

        {initialSection !== "home" && initialSection !== "kits" && (
          <>
            <PageHero section={initialSection} copy={pageCopy[initialSection]} />

            {initialSection === "history" && <History items={data.history || []} />}
            {initialSection === "honors" && <Honors items={data.honors || []} />}
            {initialSection === "players" && <Players items={data.players || []} />}
            {initialSection === "stats" && (
              <Stats
                data={data}
                maxGoals={maxGoals}
                onSubmit={addMatch}
                saving={saving}
                message={message}
              />
            )}
          </>
        )}
      </main>

      <footer className="site-footer">
        <span>{data.club.name}</span>
        <span>Next.js frontend · JavaScript backend · JSON storage</span>
      </footer>
    </>
  );
}

function Home({ data }) {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="eyebrow">{data.club.tagline}</p>
          <h1>{data.club.name}</h1>
          <p>{data.club.description}</p>

          <div className="hero-actions">
            <Link className="button primary" href="/players">
              Xem đội hình
            </Link>
            <Link className="button ghost" href="/history">
              Khám phá CLB
            </Link>
          </div>
        </div>
      </section>

      <section className="match-strip" aria-label="Trận đấu gần nhất">
        <div>
          <span className="label">Trận mới nhất</span>
          <strong>{data.home.latestMatch}</strong>
        </div>
        <div>
          <span className="label">Cầu thủ hay nhất</span>
          <strong>{data.home.mvp}</strong>
        </div>
        <div>
          <span className="label">Trận tiếp theo</span>
          <strong>{data.home.nextMatch}</strong>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Club hub</p>
          <h2>Đi vào từng lát cắt của đội bóng</h2>
        </div>

        <div className="feature-grid">
          <Link className="feature-card history-card" href="/history">
            <span>Lịch sử hình thành</span>
          </Link>
          <Link className="feature-card honors-card" href="/honors">
            <span>Danh hiệu đạt được</span>
          </Link>
          <Link className="feature-card kits-card" href="/kits">
            <span>Trang phục các mùa</span>
          </Link>
        </div>
      </section>

      <section className="section split-band">
        <div>
          <p className="eyebrow">Phong cách thi đấu</p>
          <h2>Kiểm soát bóng, pressing cao, chuyển trạng thái nhanh</h2>
        </div>

        <div className="stat-wall">
          <div>
            <strong>{data.home.possession}</strong>
            <span>Kiểm soát bóng TB</span>
          </div>
          <div>
            <strong>{data.home.goals}</strong>
            <span>Bàn từ dữ liệu</span>
          </div>
          <div>
            <strong>{data.home.unbeaten}</strong>
            <span>Trận bất bại</span>
          </div>
          <div>
            <strong>{data.home.honors}</strong>
            <span>Danh hiệu</span>
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({ section, copy }) {
  return (
    <section className={`page-hero ${section}-hero`}>
      <div>
        <p className="eyebrow">{copy[0]}</p>
        <h1>{copy[1]}</h1>
        <p>{copy[2]}</p>
      </div>
    </section>
  );
}

function History({ items }) {
  return (
    <section className="section timeline">
      {items.map((item) => (
        <article key={item.year}>
          <span>{item.year}</span>
          <div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function Honors({ items }) {
  return (
    <section className="section honors-grid">
      {items.map((item) => (
        <article key={item.id}>
          <span className="trophy">{item.id}</span>
          <h2>{item.title}</h2>
          <p>{item.years}</p>
        </article>
      ))}
    </section>
  );
}

function Players({ items }) {
  return (
    <section className="section player-grid">
      {items.map((player) => (
        <article
          key={player.number}
          className={`player-card ${player.featured ? "featured" : ""}`}
        >
          <span>{player.number}</span>
          <h2>{player.name}</h2>
          <p>{player.position}</p>
          <strong>{player.stat}</strong>
        </article>
      ))}
    </section>
  );
}

function Stats({ data, maxGoals, onSubmit, saving, message }) {
  return (
    <section className="section stats-layout">
      <div className="chart-panel">
        <h2>Bàn thắng các trận gần nhất</h2>

        <div className="bars" aria-label="Biểu đồ bàn thắng">
          {data.matches.slice(0, 5).map((match) => (
            <span
              key={match.id}
              style={{
                "--value": `${Math.max((match.goals / maxGoals) * 100, 12)}%`,
              }}
            >
              <b>{match.goals}</b>
              <small>{match.opponent}</small>
            </span>
          ))}
        </div>
      </div>

      <form className="match-form" onSubmit={onSubmit}>
        <h2>Thêm kết quả trận</h2>

        <div className="form-grid">
          <label>
            Đối thủ
            <input name="opponent" placeholder="Search:" required />
          </label>
          <label>
            Bàn FCLH
            <input name="homeGoals" type="number" min="0" defaultValue="2" required />
          </label>
          <label>
            Bàn đối thủ
            <input name="awayGoals" type="number" min="0" defaultValue="1" required />
          </label>
          <label>
            Sút trúng đích
            <input name="shots" type="number" min="0" defaultValue="7" required />
          </label>
        </div>

        <label>
          Người ghi bàn
          <input name="scorers" placeholder="...." />
        </label>

        <button className="button primary dark" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu hoàn tất"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Trận</th>
              <th>Cầu thủ ghi bàn</th>
              <th>Cú sút trúng đích</th>
            </tr>
          </thead>
          <tbody>
            {data.matches.map((match) => (
              <tr key={match.id}>
                <td>{match.score}</td>
                <td>{match.scorers}</td>
                <td>{match.shots}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}