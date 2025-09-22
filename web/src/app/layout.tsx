import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CDKB – Code Debugging Knowledge Base",
  description: "Search and discover fixes for your error logs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100`}>{children}</body>
    </html>
  );
}
