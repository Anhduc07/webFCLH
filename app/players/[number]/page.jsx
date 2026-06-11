import Link from "next/link";
import { notFound } from "next/navigation";
import { readSiteData } from "../../../lib/store";

export async function generateStaticParams() {
  const data = await readSiteData();
  return data.players.map((player) => ({ number: player.number }));
}

export default async function PlayerDetailPage({ params }) {
  const { number } = await params;
  const data = await readSiteData();
  const player = data.players.find((item) => item.number === number);

  if (!player) notFound();

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Trang chủ FCLH">
          <span className="crest">F</span>
          <span>{data.club.shortName}</span>
        </Link>
        <nav className="nav-links">
          <Link href="/players" className="active">Đội hình</Link>
          <Link href="/matches">Lịch đấu</Link>
          <Link href="/kits">Shop</Link>
        </nav>
      </header>
      <main className="player-detail">
        <section className="player-detail-hero">
          <div className="player-detail-photo">
            {player.avatar ? <img src={player.avatar} alt={player.name} /> : <span>{player.number}</span>}
          </div>
          <div>
            <p className="eyebrow">First team</p>
            <h1>{player.name}</h1>
            <p>{player.position} · {player.role}</p>
            <div className="player-detail-number">{player.number}</div>
          </div>
        </section>
        <section className="section player-metrics">
          <article><span>{player.appearances}</span><p>Trận</p></article>
          <article><span>{player.goals}</span><p>Bàn thắng</p></article>
          <article><span>{player.assists}</span><p>Kiến tạo</p></article>
          <article><span>{player.stat}</span><p>Điểm nổi bật</p></article>
        </section>
      </main>
    </>
  );
}
