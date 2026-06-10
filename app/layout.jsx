import "./globals.css";

export const metadata = {
  title: "FCLH Football Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
