import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  title: "OnGo Instant Bath Wipes",
  description: "Stay fresh wherever life takes you. OnGo Instant Bath Wipes — compact, dual-sided, and perfect for travelers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sora.variable}>{children}</body>
    </html>
  );
}
