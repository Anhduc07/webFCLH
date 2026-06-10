export default function KitsStore({ items = [] }) {
  return (
    <section style={{ minHeight: "100vh", background: "#fff", color: "#07111f" }}>
      <div
        style={{
          height: 220,
          background:
            "linear-gradient(90deg, rgba(4,18,39,.9), rgba(176,0,54,.45)), url('/images/clothing/2018.png') center/cover",
        }}
      />

      <section style={{ padding: "48px 40px 90px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: 42,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            fontWeight: 950,
          }}
        >
          Find the FC LH Kits
        </h1>

        <div style={{ display: "flex", gap: 28, marginTop: 24, fontWeight: 900 }}>
          <span style={{ borderBottom: "3px solid #07111f", paddingBottom: 8 }}>MEN</span>
          <span>KIDS</span>
          <span>WOMEN</span>
        </div>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((kit, index) => {
            const image = kit.image || "/images/clothing/2018.png";

            return (
              <article key={kit.type || kit.title}>
                <div
                  style={{
                    height: 430,
                    position: "relative",
                    background: "#f3f4f6",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image}
                    alt={kit.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      bottom: 12,
                      background: "#c49a1a",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 900,
                    }}
                  >
                    Player Edition
                  </span>
                </div>

                <div style={{ paddingTop: 14 }}>
                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontSize: 17,
                      lineHeight: 1.2,
                      textTransform: "uppercase",
                      fontWeight: 950,
                    }}
                  >
                    {kit.title}
                  </h2>

                  <p style={{ margin: 0, color: "#4b5563", fontSize: 14 }}>
                    FC LH collection · {kit.type}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}