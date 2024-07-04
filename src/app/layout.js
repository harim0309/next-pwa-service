import "./globals.css";

export const metadata = {
  title: "next-pwa-service",
  description: "테스트로 만들어본 PWA",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
