import type { Metadata } from "next";
import "./globals.css";

const metadataBase = process.env.VERCEL_URL
  ? new URL(`https://${process.env.VERCEL_URL}`)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "GPU — The Meme-Stock Engine",
  description:
    "GPU bridges Wall Street's AI supercycle with high-velocity BSC meme liquidity.",
  applicationName: "GPU",
  keywords: ["GPU", "Four.meme", "Meme-Stock", "BNB Chain", "BSC", "NVDAb"],
  authors: [{ name: "GPU", url: "https://x.com/GPUonBSC" }],
  creator: "GPU",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "GPU — The Meme-Stock Engine",
    description:
      "The premier meme token from Four.meme's Meme-Stock mechanism, paired against $NVDAb.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "GPU — The Meme-Stock Engine" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GPUonBSC",
    creator: "@GPUonBSC",
    title: "GPU — The Meme-Stock Engine",
    description: "Meme energy. Stock gravity. Powered on BSC.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
