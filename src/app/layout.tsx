import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auto playing carousel | 自動再生カルーセル",
  description: "Auto playing carousel | 自動再生カルーセル",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn(notoSansJp.variable, "h-full antialiased")}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
