import "./globals.css";
import { clsx } from "clsx";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const siteName = "DPM Clone";
const siteUrl = "https://example.com";
const siteDescription =
  "Bộ sưu tập mẫu/preview theo phong cách DPM.lol — nhanh, đẹp, SEO tối ưu.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  keywords: ["DPM", "gallery", "meme", "diffusion", "models"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: "/api/og?title=DPM%20Clone", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/api/og?title=DPM%20Clone"],
  },
  alternates: {
    canonical: siteUrl,
    languages: { "vi-VN": "/", "en-US": "/en" },
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        className={clsx("min-h-dvh antialiased text-white")}
        style={{
          background:
            "linear-gradient(135deg, rgb(47 47 49) 0%, rgb(12 12 12) 50%, rgb(38 39 38) 100%)",
        }}
      >
        <Header siteName={siteName} />
        <main className="flex h-full grow flex-col">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </body>
    </html>
  );
}
