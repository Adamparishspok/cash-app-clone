import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cashSans = localFont({
  src: [
    { path: "../../public/fonts/CashSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/CashSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/CashSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/CashSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/CashSans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-cash-sans",
  fallback: ["Helvetica Neue", "helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Send, Receive, Invest, & Manage Your Money with Cash App",
  description:
    "Cash App is the #1 finance app in the App Store. Pay anyone instantly. Save when you spend. Bank like you want to. Buy stocks or bitcoin with as little as $1.",
  icons: { icon: "/seo/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cashSans.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
